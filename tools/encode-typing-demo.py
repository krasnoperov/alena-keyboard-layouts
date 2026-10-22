#!/usr/bin/env python3
"""Encode rendered PNG timelines. Optional deps: Pillow; imageio-ffmpeg for MP4."""
import argparse
import json
import os
from pathlib import Path
import subprocess
from PIL import Image

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('frames',type=Path)
parser.add_argument('output',type=Path)
args=parser.parse_args()
timeline=json.loads((args.frames/'frames.json').read_text())
args.output.parent.mkdir(parents=True,exist_ok=True)
def load(i):return Image.open(args.frames/f'{i:03}.png').convert('RGB')
if args.output.suffix=='.gif':
    width=832
    original=load(0);height=round(original.height*width/original.width)
    images=[load(i).resize((width,height),Image.Resampling.LANCZOS)for i in range(len(timeline))]
    # Use a shared palette and retain the previous frame, so only changed areas
    # need encoding rather than a complete keyboard for every character.
    samples=sorted(set([0,len(images)-1]+[i for i,f in enumerate(timeline)if f.get('fresh') or f.get('numbers')]))
    sheet=Image.new('RGB',(832,167*((len(samples)+3)//4)), '#f6f5ef')
    for n,i in enumerate(samples):sheet.paste(images[i].resize((208,167)),((n%4)*208,(n//4)*167))
    palette=sheet.quantize(colors=128,dither=Image.Dither.NONE)
    images=[im.quantize(palette=palette,dither=Image.Dither.NONE)for im in images]
    images[0].save(args.output,save_all=True,append_images=images[1:],duration=[f['duration']for f in timeline],loop=0,optimize=False,disposal=1)
else:
    binary=os.environ.get('FFMPEG_BINARY')
    if not binary:
        import imageio_ffmpeg
        binary=imageio_ffmpeg.get_ffmpeg_exe()
    first=load(0)
    process=subprocess.Popen([binary,'-y','-loglevel','error','-f','rawvideo','-pixel_format','rgb24','-video_size',f'{first.width}x{first.height}','-framerate','25','-i','-','-an','-c:v','libx264','-preset','veryfast','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(args.output)],stdin=subprocess.PIPE)
    elapsed=0;written=0
    try:
        for i,f in enumerate(timeline):
            elapsed+=f['duration'];end=round(elapsed/40);raw=load(i).tobytes()
            for tick in range(written,end):process.stdin.write(raw)
            written=end
    finally:process.stdin.close()
    if process.wait()!=0:raise RuntimeError('Video encoder failed')
print(f'{args.output}: {args.output.stat().st_size/1024/1024:.2f} MiB')

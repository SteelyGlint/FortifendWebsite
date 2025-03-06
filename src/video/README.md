# Instructions for encoding mp4 files

    ffmpeg -i input.mp4 -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -c:a aac -strict experimental -b:a 128k -movflags faststart output.mp4


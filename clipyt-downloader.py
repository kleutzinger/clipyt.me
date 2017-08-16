import os
hashindex = -1
while hashindex == -1:
        urls = input("input clipyt.me link: \n")
        hashindex = urls.find("#")
urls = urls[hashindex+1:]
print(urls)
split = urls.split("+")
print(split)

titles = split[0:-1:3]
print(titles)

starts = split[1:-1:3]

ends = split[2:-1:3]

import subprocess

idx = 0
for index, (t,s,e) in enumerate(zip(titles,starts,ends)):
	yturl  = "https://youtu.be/" + t
	AVurl = os.popen("youtube-dl -g {0}".format(yturl)).read()
	vidurl, audiourl = AVurl.split("\n")[:2]
	vidurl = vidurl.strip()
	audiourl = audiourl.strip()
	print("downloading: ", vidurl)
	duration = int(e) - int(s)
	vid_filename = str(idx).zfill(3) +"_"+ t + ".mp4"
	vid_command = "ffmpeg -ss {0} -i {1} -c copy -t {2} {3}".format(s,vidurl, duration,vid_filename)
	subprocess.run(vid_command.split(" "))
	"""
	audio_filename = str(idx).zfill(3) +"_"+ t + ".webm"
	audio_command = "ffmpeg -ss {0} -i {1} -c copy -t {2} {3}".format(s,audiourl, duration,audio_filename)
	subprocess.run(audio_command.split(" "))
	"""
	idx += 1

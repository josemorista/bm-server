from sys import argv
from matplotlib import pyplot as plt;
from skimage import io, img_as_float;

def execute(imgPath, outFilePath, bins, range):
	img = img_as_float(io.imread(imgPath, as_gray=True));
	hist = plt.hist(img.flat, bins, range);
	plt.savefig(outFilePath);

execute(argv[1], argv[2], int(argv[3]), (float(argv[4]), float(argv[5])));

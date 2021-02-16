from sys import argv
from matplotlib import pyplot as plt;
from skimage import io, img_as_float;

def execute(imgPath, outFilePath, bins, range):
	img = img_as_float(io.imread(imgPath, as_gray=True));
	plt.imsave(outFilePath, plt.hist(img.flat, bins, range));

execute(argv[1], argv[2], int(argv[3]), (int(argv[4]), float(argv[5])));

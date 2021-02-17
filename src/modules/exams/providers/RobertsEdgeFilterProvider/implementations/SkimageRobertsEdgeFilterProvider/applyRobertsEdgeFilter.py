from sys import argv
from matplotlib import pyplot as plt;
from skimage import io, img_as_float;
from skimage.filters import sobel;

def execute(imgPath, outFilePath):
	img = img_as_float(io.imread(imgPath, as_gray=True));
	edged = sobel(img)
	plt.imsave(outFilePath, edged, cmap='gray');

execute(argv[1], argv[2]);

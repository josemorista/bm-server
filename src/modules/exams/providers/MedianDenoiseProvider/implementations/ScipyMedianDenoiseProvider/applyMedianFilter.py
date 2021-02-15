from sys import argv
from scipy import ndimage;
from matplotlib import pyplot as plt;
from skimage import io, img_as_float;

def execute(imgPath, outFilePath, size):
	img = img_as_float(io.imread(imgPath, as_gray=True));
	denoised = ndimage.median_filter(img, size);
	plt.imsave(outFilePath, denoised, cmap='gray');

execute(argv[1], argv[2], int(argv[3]));

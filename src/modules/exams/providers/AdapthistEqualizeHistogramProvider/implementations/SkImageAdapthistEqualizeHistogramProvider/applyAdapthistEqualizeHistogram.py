from sys import argv
from matplotlib import pyplot as plt;
from skimage import io, exposure, img_as_float;

def execute(imgPath, outFilePath):
	img = img_as_float(io.imread(imgPath, as_gray=True));
	equalized = exposure.equalize_adapthist(img);
	plt.imsave(outFilePath, equalized, cmap='gray');

execute(argv[1], argv[2]);

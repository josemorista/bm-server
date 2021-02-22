from sys import argv
from matplotlib import pyplot as plt;
from skimage import io, img_as_ubyte;
from skimage.filters import rank;
from skimage.morphology import disk;
import numpy as np;

def execute(imgPath, outFilePath, diskSize):
	img = img_as_ubyte(io.imread(imgPath, as_gray=True));
	local = rank.otsu(img, disk(diskSize));
	met = img >= local;
	segmented = np.zeros(img.shape, dtype=np.float);
	segmented[met] = img[met];
	plt.imsave(outFilePath, segmented, cmap='gray');

execute(argv[1], argv[2], int(argv[3]));

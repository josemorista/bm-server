from skimage import io,img_as_ubyte;
from sys import argv;

def execute(imgPath):
	img = (img_as_ubyte(io.imread(imgPath, as_gray=True))).reshape(-1);
	notNull = img[img != 0];
	print(len(notNull));

execute(argv[1]);
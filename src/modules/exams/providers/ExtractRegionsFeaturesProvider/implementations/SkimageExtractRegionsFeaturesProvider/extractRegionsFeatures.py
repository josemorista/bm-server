from sys import argv
from skimage import io, measure, img_as_float;
import pandas as pd;

def execute(imgPath, orgImgPath):
	img = img_as_float(io.imread(imgPath, as_gray=True));
	orgImg = img_as_float(io.imread(orgImgPath, as_gray=True));
	imgLabeled = measure.label(img > 0, connectivity=orgImg.ndim);
	props = measure.regionprops_table(imgLabeled, orgImg, properties=[
		'area',
		'centroid',
		'eccentricity',
		'equivalent_diameter',
		'extent',
		'max_intensity',
		'mean_intensity',
		'orientation',
		'perimeter'
		'bbox'
		]);
	data = pd.DataFrame(props);
	data.rename(columns={'centroid-0': 'centroidX', 'centroid-1': 'centroidY'});
	data['aspectRatio'] = (data['bbox'][2] - data['bbox'][0]) / (data['bbox'][3] - data['bbox'][1]);
	print(data.to_json(orient='records'));

execute(argv[1], argv[2]);

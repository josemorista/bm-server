from sys import argv
from skimage import io, measure, img_as_float;
import pandas as pd;
from PIL import Image, ImageDraw;

def execute(imgPath, orgImgPath, outImgPath):
	
	pilImage = Image.open(orgImgPath).convert('RGBA');
	draw = ImageDraw.Draw(pilImage)

	img = img_as_float(io.imread(imgPath, as_gray=True));
	orgImg = img_as_float(io.imread(orgImgPath, as_gray=True));
	imgLabeled = measure.label(img > 0, connectivity=orgImg.ndim);
	props = measure.regionprops_table(imgLabeled, orgImg, properties=[
		'area',
		'centroid',
		'eccentricity',
		'equivalent_diameter',
		'extent',
		'mean_intensity',
		'orientation',
		'perimeter',
		'bbox'
		]);

	
	# Export output as JSON
	data = pd.DataFrame(props);

	for index, row in data.iterrows():
		draw.rectangle(((row['bbox-1'], row['bbox-0']), (row['bbox-3'], row['bbox-2'])), outline='green');
		draw.point((row['centroid-1'], row['centroid-0']), fill='red');
		draw.text((row['centroid-1'], row['centroid-0']), f"{row['area']})", size=3);
	
	pilImage.save(outImgPath);

	
	data['aspectRatio'] = (data['bbox-3'] - data['bbox-1']) / (data['bbox-2'] - data['bbox-0']);
	data = data.rename(columns={
		"centroid-1": "centroidX",
		 "centroid-0": "centroidY", 
		 "mean_intensity":"meanIntensity",
		 "equivalent_diameter": "equivalentDiameter",
		 "bbox-1": "bboxX0",
		 "bbox-0": "bboxY0",
		 "bbox-3": "bboxX1",
		 "bbox-2": "bboxY1",
	});
	print(data.to_json(orient='records'));

execute(argv[1], argv[2], argv[3]);

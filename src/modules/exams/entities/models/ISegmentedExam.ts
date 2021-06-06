export interface ISegmentedExam {
	examId: string;
	algorithm: 'randomForest' | 'SVM' | 'MLP';
	threshold: number;
	affectedArea: number;
	classifiedArea: number;
	createdAt: Date | string;
	updatedAt: Date | string;
}
pipeline {
    agent {
        docker {
            image 'node:12-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
								sh 'tar --exclude=.git -cvz artifact.zip .'
								sh 'rsync -v artifact.zip ubuntu@ec2-54-89-241-219.compute-1.amazonaws.com:/tmp'
            }
        }

				stage('Publish') {
					steps {
						sh 'ssh ubuntu@ec2-54-89-241-219.compute-1.amazonaws.com cd /tmp && ls'
					}
				}
    }
}
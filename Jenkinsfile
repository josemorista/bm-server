pipeline {
    agent any
    
    tools {nodejs "nodejs"}

    stages {
        stage('Build') { 
            steps {
							sh """
                npm install
								tar czvf bm-artifact.tgz node_modules package.json docker-compose.yml tmp uploads ormconfig-sample.json src
								rsync -v bm-artifact.tgz ubuntu@ec2-54-89-241-219.compute-1.amazonaws.com:/tmp/bmdeploy
							"""
            }
        }

				stage('Publish') {
					steps {
						sh """
							ssh ubuntu@ec2-54-89-241-219.compute-1.amazonaws.com << EOF
							cd /tmp/bmdeploy 
							tar -xf bm-artifact.tgz -C /home/ubuntu/bmdeploy
							EOF
							"""
					}
				}
    }
}
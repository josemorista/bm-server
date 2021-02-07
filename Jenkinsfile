pipeline {
    agent any

		environment {
			artifact = 'bmsartifact.tgz'
			directory = '/home/ubuntu/bmserver'
		}

    tools {nodejs "nodejs"}

    stages {
        stage('Build') { 
            steps {
							sh """
                npm install
								npm run build
								tar czf $artifact node_modules package.json docker-compose.yml tmp uploads ormconfig.sample.json dist process.json tsconfig.json src
								scp ./$artifact ubuntu@ec2-54-89-241-219.compute-1.amazonaws.com:/tmp/$artifact
								rm -rf ./*
							"""
            }
        }

				stage('Publish') {
					steps {
						sh """
							ssh ubuntu@ec2-54-89-241-219.compute-1.amazonaws.com << EOF 
							mkdir -p $directory
							rm -rf $directory/*
							tar -xf /tmp/$artifact -C $directory
							rm /tmp/$artifact
							cd $directory
							sed 's/src/dist/g' ormconfig.sample.json | sed 's/.ts/.js/g' &> ormconfig.json
							sudo docker-compose up -d
							npm run typeorm migration:run
							rm -rf ./src
							rm tsconfig.json
							pm2 delete process.json &> /dev/null
							pm2 start process.json
EOF"""
					}
				}
    }
}

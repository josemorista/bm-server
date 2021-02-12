pipeline {
    agent any

		environment {
			host = 'ec2-34-203-244-243.compute-1.amazonaws.com'
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
								tar czf $artifact node_modules package.json docker-compose.yml ormconfig.sample.json dist process.json
								scp ./$artifact ubuntu@$host:/tmp/$artifact
								rm -rf ./*
							"""
            }
        }

				stage('Publish') {
					steps {
						sh """
							ssh ubuntu@$host << EOF 
							mkdir -p $directory
							rm -rf $directory/dist
							rm -rf $directory/tmp
							rm -rf $directory/node_modules
							rm $directory/docker-compose.yml
							rm $directory/package.json
							rm $directory/process.json
							rm $directory/ormconfig.sample.json
							rm $directory/ormconfig.json
							tar -xf /tmp/$artifact -C $directory
							rm /tmp/$artifact
							cd $directory
							sed 's/src/dist/g' ormconfig.sample.json | sed 's/.ts/.js/g' &> ormconfig.json
							sudo docker-compose up -d postgres
							mkdir -p ./tmp
							mkdir -p ./uploads
							pm2 delete process.json &> /dev/null
							pm2 start process.json
EOF"""
					}
				}
    }
}

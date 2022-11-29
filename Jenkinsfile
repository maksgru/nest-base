def dockerImage
node {
    cleanWs()
    checkout scm
    stage('build') {
            dockerImage = docker.build("my-image:${env.BUILD_ID}", "-f Dockerfile .").inside {
                withEnv(["NODE_ENV = 'test'"]) {
                    sh 'yarn test:unit'
                }
            }
        }
}

void buildDockerImage() {
    stage('build') {
        dockerImage = docker.build("my-image:${env.BUILD_ID}", "-f Dockerfile .")
        dockerImage.inside {
            sh 'yarn test:unit'
        }
    }
}

void runTestUnit() {
    stage('test:unit') {
        env.NODE_ENV = 'test'
        dockerImage.inside {
            sh 'yarn test:unit'
        }
    }
}

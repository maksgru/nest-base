def dockerImage
node {
    cleanWs()
    checkout scm
    buildDockerImage()
    // runTestUnit()
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

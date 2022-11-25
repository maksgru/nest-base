node {
    cleanWs()
    stage('build') {
        checkout scm
        env.NODE_ENV = 'test'
        image = docker.build("my-image:${env.BUILD_ID}", "-f Dockerfile .")
    }
    runTestUnit()
}

void runTestUnit() {
    stage('test:unit') {
        sh 'yarn test:unit'
    }
}

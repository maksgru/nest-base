node {
    cleanWs()
    checkout scm
    stage('test') {
        def dockerImage = docker.build("my-image:${env.BUILD_ID}", "-f Dockerfile .")
        dockerImage.inside {
            withEnv(["NODE_ENV = 'test'"]) {
                sh 'yarn test:unit'
            }
        }
    }
}

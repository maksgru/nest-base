properties([])

 def dockerImage

node {
    prepareJob()
    buildImage()
    runTestUnit()
}

void prepareJob() {
    cleanWs()
    checkout scm

    def envVariablesJson = readJSON file: './config/configVariables.json'

    sh "echo $envVariablesJson"

    

    def secrets = getListOfSecretes(envVariablesJson)

    sh "echo $secrets"
}

void buildDockerImage() {
    stage('build') {
        dockerImage = docker.build("my-image:${env.BUILD_ID}", '-f Dockerfile .')
    }
}

def getListOfSecretes(secrets) {
    secretsOut = []
    envVariablesJson.each { key, value ->
        if (value instanceof String) {
            secretsOut += ['vaultKey': value]
        } else {
            secretsOut += getListOfSecretes(secrets[key])
        }
    }
    return secretsOut
}

void runTestUnit() {
    stage('test:unit') {
        dockerImage.inside {
            sh 'yarn install'
            sh 'yarn test:unit'
        }
    }
}

void getVaultVariables() {

}

void loadEnvToDockerImage() {

}

void pushDockerImage() {
    stage('push') {

    }
}

void depoy() {

}

void sonarCubeCheck() {

}

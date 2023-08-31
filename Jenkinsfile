pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub')
  }
  stages {
    stage('Build') {
      steps {
        sh 'docker-compose build'
      }
    }
    stage('Login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push') {
      steps {
        script {
          def imageName = 'lavakumar7619/hotel_ease'
          sh "docker-compose push"
          sh "docker tag ${imageName}:latest ${imageName}:${env.BUILD_NUMBER}"
          sh "docker push ${imageName}:${env.BUILD_NUMBER}"
        }
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}

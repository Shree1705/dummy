pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    DOCKERHUB_CREDENTIALS = credentials('docker_login')
  }
  stages {
    stage('Build') {
      steps {
        sh 'docker-compose build'
      }
    }
    stage('Login to DockerHub') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push to DockerHub') {
      steps {
        sh 'docker-compose push'
      }
    }
    stage('Deploy with Docker Compose') {
      steps {
        sh 'docker-compose up -d'
      }
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}

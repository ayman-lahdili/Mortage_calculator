
# Mortage Calculator

This project consists of the development of a simple web application 
using a service-oriented architecture (SOA).

## Description

The web application has to calculate the monthly payment $M$ to pay off a mortgage debt $D$ during a certain number $N$ of months by applying a certain interest rate $I$.

**Formula to calculate the monthly mortgage payement:**
$$ M = D [ I/12(1 + I/12)^N ] / [ (1 + I/12)^N − 1]} $$

## How does it work?

* An **AWS Lambda function** is used to calculate mortgage calculation service
* This Lambda function is invoqued using a **AWS REST API Gateway** to route calls
* APINinjas's **API** is used to To obtain the current Bank rate of Canada
* The whole is hosted on **AWS Amplify**

## Built with...

* **Python** for the AWS Lambda function
* **Javascript** for the logic of the website
* **HTML** for the structure of the form
* **CSS** for styling the website

## See it for yourself
[**Mortgage calculator**](https://deploy.dffg9pztcsg0.amplifyapp.com/#)
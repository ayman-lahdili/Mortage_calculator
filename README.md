
# Mortage Calculator

The project consists of the development of a simple application 
using a service-oriented architecture (SOA).

## Description

The web application has to calculate the monthly payment $M$ to pay off a mortgage debt $D$ during a certain number $N$ of months by applying a certain interest rate $I$.

**formula to calculate the monthly mortgage payement**
$$\left(M = D [ I/12(1 + I/12)^N ] / [ (1 + I/12)^N − 1]\right)$$

## How does it work?

* An **AWS Lambda function** is used to calculate mortgage calculation service
* This Lambda function is invoqued using a **AWS REST API Gateway** to route calls
* APINinjas's **API** is used to To obtain the current Bank rate of Canada

## Built with...

* **Python** for the aws Lambda function
* **Javascript** for the logic of the website
* **HTML** for the structure of the form
* **CSS** for styling the website

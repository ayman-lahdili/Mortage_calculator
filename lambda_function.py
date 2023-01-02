import json
import requests

def lambda_handler(event, context):
    
    N = event['queryStringParameters']['N']
    I = event['queryStringParameters']['I']
    D = event['queryStringParameters']['D']
    
    functionResponse = {}
    
    if I == "":
        
        api_url = 'https://api.api-ninjas.com/v1/interestrate?country=canada&central_bank_only=true'
        response = requests.get(api_url, headers={'X-Api-Key': 'tqSz1zW8yPlJS7FhBrW2ew==mliuAqv9IcKfJcW0'})
        
        if response.status_code == requests.codes.ok:
            I = (response.json()['central_bank_rates'][0]['rate_pct'] + 1)/100
        
            
    monthly_payment = str( float(D) *  (float(I) / 12 * (1 + float(I)/12)**float(N)) / ((1 + float(I)/12)**float(N) - 1))
    
    functionResponse['monthly_payment'] = monthly_payment

    
    return {
        'statusCode':200,
        'body': json.dumps(functionResponse)
    }

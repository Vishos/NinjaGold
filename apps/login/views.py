from django.shortcuts import render, redirect,  HttpResponse
from django.http import JsonResponse
import random

def index(request):

    return render(request, "login/index.html")
#'option' is the capture group from the urls py regex... the two names must match
def process(request, option):
    print "in process route"
    resString = ""
    resStatus = 1
    resAmount = 0
    option = request.GET.get('option')
    
    #action1 = farm 10-20 gold
    if option == "action1":
        resAmount += random.randint(10,20)
        resString = "You wokred hard and earned {} gold at the farm.".format(resAmount) 

    #action2 = Cave 5-10 gold
    if option == "action2":
        resAmount += random.randint(5,10)
        resString = "You went exploring a dark cave and found {} gold.".format(resAmount) 
        
    #action3 = House 2-5 gold
    if option == "action3":
        resAmount += random.randint(2,5)
        resString = "There was {} gold in the junk drawers and under the couch cushions at your house.".format(resAmount) 

    #action4 = Casino -50 to 50 gold
    if option == "action4":
        resAmount += random.randint(-50,50)
        if resAmount < 0:
            resStatus = 2
            resString = "The house always wins. This time they only took {} of your gold coins".format(resAmount * -1)
        else:
            resString = "Against all odds you managed to win {} gold at the casino.".format(resAmount)
    
    return JsonResponse({'resString':resString, "resStatus": resStatus, "resAmount": resAmount})

# Create your views here.
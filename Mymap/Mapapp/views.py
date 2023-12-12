from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,'home.html')
def page_not_found(request,exception):
    return render(request,'404.html')
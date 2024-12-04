import random
import json
import os

from datetime import datetime, timedelta

def generate_random_dob():
    # Define the date range for birth dates
    start_date = datetime(1950, 1, 1)  # Earliest date of birth
    end_date = datetime(2010, 12, 31)  # Latest date of birth
    
    # Generate a random number of days between the start and end dates
    random_days = random.randint(0, (end_date - start_date).days)
    
    # Calculate the random date
    random_dob = start_date + timedelta(days=random_days)
    
    # Format the date in the desired format (e.g., YYYY-MM-DD)
    return random_dob.strftime("%Y-%m-%d")

# Function to generate random data
def generate_random_data():
    alive = ["true","false"]
    avatar = ["man", "woman", "boy", "girl"]
    lastnames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Martinez", "Lee", "Lopez", "Taylor"]
    firstnames = ["John", "Jane", "Michael", "Sarah", "Robert", "Emily", "William", "Jessica", "James", "Anna"]
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    genders = ["Male", "Female", "Non-Binary"]
    languages = ["Twi", "Ewe", "Ga", "Frafra", "Dagari", "Other"]
    education_levels = ["Primary", "Secondary", "Tertiary", "Bachelor's Degree", "Master's Degree", "Doctorate"]
    employment_status = ["Employed", "Unemployed", "Self-Employed", "Student", "Retired"]
    occupations = ["Engineer", "Doctor", "Teacher", "Artist", "Developer", "Manager"]
    cities = ["East Legon", "Lapaz", "Madina", "Houston", "Phoenix", "Philadelphia"]
    countries = ["USA", "Canada", "UK", "Australia", "Germany"]
    email=f"user{random.randint(1000,9999)}@{random.choice(["yahoo","gmail","aol","olgabyte"])}.com"
    phone_prefixes = ["024", "026", "020", "025", "+61"]
    emergencycontact = ["024", "026", "020", "025", "+61"]
    landmark = ["melcom", "mensvic","KFC", "Erata Hotel", "Blue Gate", "Elican School", "Divine Mercy Catholic Church", "Nadel Driving School"]
    otherlanguages = ["English", "French", "German"]
    nameofschool = ["UPSA", "University of Ghana", "University of Winneba", "RadsFord University", "UMAT", "UHAS", "IPMC", "ALX", "OLGABYTE"]
    previousparish = ["St. Augustine Catholic Church - Ashaiman", "Christ the King - Accra", "St. Monica", "Queen of Peace - Madina", "St. Luke - Ashaiman"]
    baptised = ["Yes", "No"]
    baptised = random.choice(["Yes", "No"])
    firstcommunion = random.choice(["Yes", "No"])
    confirmed = random.choice(["Yes", "No"])
    maritalstatus = ["Single","Married","Divorced","Seperated","Widowed"]
    baptised_officiatingminister = random.choice(["Rev. Fr. Raphael Vedenku", "Rev. Fr. Francis Destiny Amenuvor", "Rev. Fr. Vincent Asare Bediako", "Rev. Fr. Donatus Zigah"]) if baptised == "Yes" else ""
    baptised_placeofbaptism =  random.choice(["Aflao", "Accra", "Lolobi", "Madina", "Walewale", "Keta", "Ashaiman", "Tema"]) if baptised == "Yes" else ""
    baptised_datebaptism = generate_random_dob() if baptised == "Yes" else ""
    baptised_nlb = random.choice([123456, 654321, 789012, 345678, 901234, 567890, 234567, 890123, 456789, 678901]) if baptised == "Yes" else ""
    baptised_godparent = random.choice(["Mr. Charles Kojo", "Mr. Buzanga Kizito", "Mrs. Jane Love", "Mrs Agbeko Esi", "Mrs Awuram Vida"]) if baptised == "Yes" else ""
    firstcommunion_officiatingminister = random.choice(["Rev. Fr. Raphael Vedenku", "Rev. Fr. Francis Destiny Amenuvor", "Rev. Fr. Vincent Asare Bediako", "Rev. Fr. Donatus Zigah"]) if firstcommunion == "Yes" else ""
    firstcommunion_placeoffirstcommunion = random.choice(["Aflao", "Accra", "Lolobi", "Madina", "Walewale", "Keta", "Ashaiman", "Tema"]) if firstcommunion == "Yes" else ""
    firstcommunion_datefirstcommunion = generate_random_dob() if firstcommunion == "Yes" else ""
    firstcommunion_nlc=random.choice([123456, 654321, 789012, 345678, 901234, 567890, 234567, 890123, 456789, 678901]) if firstcommunion == "Yes" else ""
    firstcommunion_godparent = random.choice(["Mr. Charles Kojo", "Mr. Buzanga Kizito", "Mrs. Jane Love", "Mrs Agbeko Esi", "Mrs Awuram Vida"]) if baptised == "Yes" else ""
    confirmed_officiatingminister=random.choice(["Rev. Fr. Raphael Vedenku", "Rev. Fr. Francis Destiny Amenuvor", "Rev. Fr. Vincent Asare Bediako", "Rev. Fr. Donatus Zigah"]) if confirmed == "Yes" else ""
    confirmed_placeofconfirmation = random.choice(["Aflao", "Accra", "Lolobi", "Madina", "Walewale", "Keta", "Ashaiman", "Tema"]) if baptised == "Yes" else ""
    confirmed_datefconfirmation=generate_random_dob() if confirmed == "Yes" else ""
    confirmed_nlconf=random.choice([123456, 654321, 789012, 345678, 901234, 567890, 234567, 890123, 456789, 678901]) if confirmed == "Yes" else ""
    confirmed_godparent=random.choice(["Mr. Charles Kojo", "Mr. Buzanga Kizito", "Mrs. Jane Love", "Mrs Agbeko Esi", "Mrs Awuram Vida"]) if confirmed == "Yes" else ""
    maritalstatus=random.choice(maritalstatus)
    married_officiatingminister=random.choice(["Rev. Fr. Raphael Vedenku", "Rev. Fr. Francis Destiny Amenuvor", "Rev. Fr. Vincent Asare Bediako", "Rev. Fr. Donatus Zigah"]) if maritalstatus != "Single" else ""
    married_placeofholymatrimony=random.choice(["Aflao", "Accra", "Lolobi", "Madina", "Walewale", "Keta", "Ashaiman", "Tema"]) if maritalstatus != "Single" else ""
    married_dateofholymatrimony=generate_random_dob() if maritalstatus != "Single" else ""
    married_nlm=random.choice([123456, 654321, 789012, 345678, 901234, 567890, 234567, 890123, 456789, 678901]) if maritalstatus != "Single"  else ""
    married_godparent=random.choice(["Mr. Charles Kojo", "Mr. Buzanga Kizito", "Mrs. Jane Love", "Mrs Agbeko Esi", "Mrs Awuram Vida"]) if maritalstatus != "Single" else ""
    nameofspouse=f"{random.choice(firstnames)} {random.choice(firstnames)}"  if maritalstatus != "Single" else ""
    spousedenomination=random.choice(["Catholic", "Non-Catholic"])
    numberofchildren = int(str(random.randint(1, 6)))
    nameofchildren=random.sample(firstnames, random.randint(1, numberofchildren)) if maritalstatus != "Single" else ""
    yearofbirth= int(random.randint(1950, 2010))
    age= 2024 - yearofbirth
    dues = []
    active=random.choice(["active", "inactive"])
    # Set occupation based on the age condition

    # Generate random record
    record = {
        "alive": random.choice(alive),
        "avatar": random.choice(avatar),
        "firstname": random.choice(firstnames),
        "fathersname": f"{random.choice(firstnames)}  {random.choice(lastnames)}",
        "mothersname": f"{random.choice(firstnames)}  {random.choice(lastnames)}",
        "othernames": "",
        "lastname": random.choice(lastnames),
        "dayofbirth": random.choice(days),
        "numberdayofbirth": str(random.randint(1, 28)),
        "monthofbirth": str(random.randint(1, 12)),
        "yearofbirth": yearofbirth,
        "active":active,
        "age": age,
        "gender": random.choice(genders),
        "mothertongue": random.choice(languages),
        "placeofbirth": random.choice(cities),
        "hometown": random.choice(cities),
        "country": random.choice(countries),
        "email": email,
        "phonenumber1": f"{random.choice(phone_prefixes)}-{random.randint(1000000000,9999999999)}",
        "phonenumber2": f"{random.choice(phone_prefixes)}-{random.randint(1000000000,9999999999)}",
         "emergencycontact": f"{random.choice(phone_prefixes)}-{random.randint(1000000000,9999999999)}",
        "digitaladdress": f"GA-{random.randint(1000,9999)}-{random.randint(1000,9999)}",
        "city": random.choice(cities),
        "landmark": f"Near {random.choice(landmark)} Park",
        "education": random.choice(education_levels),
        "otherlanguages": random.sample(otherlanguages, random.randint(1, 3)),
        "skills": random.sample(["Coding", "Writing", "Public Speaking", "Design", "Management"], random.randint(1, 3)),
        "occupationstatus": random.choice(employment_status),
        "occupation": random.choice(occupations),
        "placeofwork": random.choice(["Tech Corp", "Health Center", "School District", "Art Studio", "Bank"]),
        "nameofschool": f"{random.choice(nameofschool)} High School",
        "previousparish": f"{random.choice(previousparish)} Parish",
        "previousassociations": random.sample(["Choir", "Youth Group", "IT Team", "CCR", "CORSRA", "CYO"], random.randint(0, 2)),
        "currentassociations": random.sample(["Choir", "Youth Group", "IT Team", "CCR", "CORSRA", "CYO","Christian Mothers", "Main Choir"], random.randint(0, 2)),
        "baptised": baptised,
        "baptised_officiatingminister": baptised_officiatingminister,
        "baptised_placeofbaptism": baptised_placeofbaptism,
        "baptised_datebaptism":baptised_datebaptism,
        "baptised_nlb": baptised_nlb,
        "baptised_godparent": baptised_godparent,
        "firstcommunion":firstcommunion,
        "firstcommunion_officiatingminister": firstcommunion_officiatingminister,
        "firstcommunion_placeoffirstcommunion": firstcommunion_placeoffirstcommunion,
        "firstcommunion_datefirstcommunion": firstcommunion_datefirstcommunion,
        "firstcommunion_nlc": firstcommunion_nlc,
        "firstcommunion_godparent": firstcommunion_godparent,
        "confirmed": confirmed,
        "confirmed_officiatingminister":confirmed_officiatingminister,
        "confirmed_placeofconfirmation":confirmed_placeofconfirmation,
        "confirmed_datefconfirmation":confirmed_datefconfirmation,
        "confirmed_nlconf":confirmed_nlconf,
        "confirmed_godparent": confirmed_godparent,
        "maritalstatus":maritalstatus,
        "married_officiatingminister":married_officiatingminister,
        "married_placeofholymatrimony": married_placeofholymatrimony,
        "married_dateofholymatrimony":married_dateofholymatrimony,
        "married_nlm":married_nlm,
        "married_godparent":married_godparent,
        "nameofspouse":nameofspouse,
        "spousedenomination": spousedenomination,
        "spousenationality": random.choice(countries),
        "numberofchildren": numberofchildren,
        "nameofchildren": nameofchildren,
        "dues":dues
    }
    return record

# Generate 500 records
records = [generate_random_data() for _ in range(2470)]

# Update each record to include a unique ID
def update_records_with_id(records):
    for index, record in enumerate(records):
        record["id"] = index + 1  # Start ID from 1
    return records



# Update the records with an ID
records_with_id = update_records_with_id(records)

# Update the records with an ID
records_with_id = update_records_with_id(records)

# Save the updated records to a new JSON file in the parent folder
parent_folder_path = os.path.join(os.path.dirname(os.getcwd()), 'dmcc.json')

with open(parent_folder_path, 'w') as file:
    json.dump(records_with_id, file, indent=2)
       
parent_folder_path

print("Done")
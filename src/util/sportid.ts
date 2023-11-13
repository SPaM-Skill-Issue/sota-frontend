const _sports = {
    "1": "Archery",
    "2": "Artistic Gymnastics",
    "3": "Artistic Swimming",
    "4": "Athletics",
    "5": "Badminton",
    "6": "Basketball",
    "7": "Basketball 3×3",
    "8": "Beach Volleyball",
    "9": "Bmx Freestyle",
    "10": "Bmx Racing",
    "11": "Boxing",
    "12": "Breaking",
    "13": "Canoe Slalom",
    "14": "Canoe Sprint",
    "15": "Cycling Track",
    "16": "Diving",
    "17": "Equestrian",
    "18": "Fencing",
    "19": "Football",
    "20": "Golf",
    "21": "Handball",
    "22": "Hockey",
    "23": "Judo", 
    "24": "Marathon Swimming", 
    "25": "Modern Pentathlon", 
    "26": "Mountain Biking", 
    "27": "Rhythmic Gymnastics", 
    "28": "Road Cycling", 
    "29": "Rowing", 
    "30": "Rugby", 
    "31": "Sailing", 
    "32": "Shooting", 
    "33": "Skateboarding", 
    "34": "Sport Climbing", 
    "35": "Surfing", 
    "36": "Swimming", 
    "37": "Table Tennis", 
    "38": "Taekwondo", 
    "39": "Tennis", 
    "40": "Trampoline", 
    "41": "Triathlon", 
    "42": "Volleyball", 
    "43": "Water Polo", 
    "44": "Weightlifting", 
    "45": "Wrestling"
}

type SportID = keyof typeof _sports;

const getSportName = (id: SportID| string): string => {
    if (!_sports [id as SportID]) return id;
    return _sports[id as SportID];
}

export { getSportName };
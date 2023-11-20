import React, { useEffect, useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import DropdownMenu from './dropdownMenu';

interface Entry {
    label: string;
    key: string;
}

interface sendData {
    dataHandle: (value: string) => void;
    catagoryHandle: (value: string) => void;
}

const sportItems = [
    {
        "label": "Archery",
        "key": "1"
    },
    {
        "label": "Artistic Gymnastics",
        "key": "2"
    },
    {
        "label": "Artistic Swimming",
        "key": "3"
    },
    {
        "label": "Athletics",
        "key": "4"
    },
    {
        "label": "Badminton",
        "key": "5"
    },
    {
        "label": "Basketball",
        "key": "6"
    },
    {
        "label": "Basketball 3×3",
        "key": "7"
    },
    {
        "label": "Beach Volleyball",
        "key": "8"
    },
    {
        "label": "Bmx Freestyle",
        "key": "9"
    },
    {
        "label": "Bmx Racing",
        "key": "10"
    },
    {
        "label": "Boxing",
        "key": "11"
    },
    {
        "label": "Breaking",
        "key": "12"
    },
    {
        "label": "Canoe Slalom",
        "key": "13"
    },
    {
        "label": "Canoe Sprint",
        "key": "14"
    },
    {
        "label": "Cycling Track",
        "key": "15"
    },
    {
        "label": "Diving",
        "key": "16"
    },
    {
        "label": "Equestrian",
        "key": "17"
    },
    {
        "label": "Fencing",
        "key": "18"
    },
    {
        "label": "Football",
        "key": "19"
    },
    {
        "label": "Golf",
        "key": "20"
    },
    {
        "label": "Handball",
        "key": "21"
    },
    {
        "label": "Hockey",
        "key": "22"
    },
    {
        "label": "Judo",
        "key": "23"
    },
    {
        "label": "Marathon Swimming",
        "key": "24"
    },
    {
        "label": "Modern Pentathlon",
        "key": "25"
    },
    {
        "label": "Mountain Biking",
        "key": "26"
    },
    {
        "label": "Rhythmic Gymnastics",
        "key": "27"
    },
    {
        "label": "Road Cycling",
        "key": "28"
    },
    {
        "label": "Rowing",
        "key": "29"
    },
    {
        "label": "Rugby",
        "key": "30"
    },
    {
        "label": "Sailing",
        "key": "31"
    },
    {
        "label": "Shooting",
        "key": "32"
    },
    {
        "label": "Skateboarding",
        "key": "33"
    },
    {
        "label": "Sport Climbing",
        "key": "34"
    },
    {
        "label": "Surfing",
        "key": "35"
    },
    {
        "label": "Swimming",
        "key": "36"
    },
    {
        "label": "Table Tennis",
        "key": "37"
    },
    {
        "label": "Taekwondo",
        "key": "38"
    },
    {
        "label": "Tennis",
        "key": "39"
    },
    {
        "label": "Trampoline",
        "key": "40"
    },
    {
        "label": "Triathlon",
        "key": "41"
    },
    {
        "label": "Volleyball",
        "key": "42"
    },
    {
        "label": "Water Polo",
        "key": "43"
    },
    {
        "label": "Weightlifting",
        "key": "44"
    },
    {
        "label": "Wrestling",
        "key": "45"
    }
];

const countryItems = [
    {
        "label": "Afghanistan",
        "key": "AF"
    },
    {
        "label": "Albania",
        "key": "AL"
    },
    {
        "label": "Algeria",
        "key": "DZ"
    },
    {
        "label": "American Samoa",
        "key": "AS"
    },
    {
        "label": "Andorra",
        "key": "AD"
    },
    {
        "label": "Angola",
        "key": "AO"
    },
    {
        "label": "Anguilla",
        "key": "AI"
    },
    {
        "label": "Antarctica",
        "key": "AQ"
    },
    {
        "label": "Antigua and Barbuda",
        "key": "AG"
    },
    {
        "label": "Argentina",
        "key": "AR"
    },
    {
        "label": "Armenia",
        "key": "AM"
    },
    {
        "label": "Aruba",
        "key": "AW"
    },
    {
        "label": "Australia",
        "key": "AU"
    },
    {
        "label": "Austria",
        "key": "AT"
    },
    {
        "label": "Azerbaijan",
        "key": "AZ"
    },
    {
        "label": "Bahamas",
        "key": "BS"
    },
    {
        "label": "Bahrain",
        "key": "BH"
    },
    {
        "label": "Bangladesh",
        "key": "BD"
    },
    {
        "label": "Barbados",
        "key": "BB"
    },
    {
        "label": "Belarus",
        "key": "BY"
    },
    {
        "label": "Belgium",
        "key": "BE"
    },
    {
        "label": "Belize",
        "key": "BZ"
    },
    {
        "label": "Benin",
        "key": "BJ"
    },
    {
        "label": "Bermuda",
        "key": "BM"
    },
    {
        "label": "Bhutan",
        "key": "BT"
    },
    {
        "label": "Bolivia, Plurinational State of",
        "key": "BO"
    },
    {
        "label": "Bonaire, Sint Eustatius and Saba",
        "key": "BQ"
    },
    {
        "label": "Bosnia and Herzegovina",
        "key": "BA"
    },
    {
        "label": "Botswana",
        "key": "BW"
    },
    {
        "label": "Bouvet Island",
        "key": "BV"
    },
    {
        "label": "Brazil",
        "key": "BR"
    },
    {
        "label": "British Indian Ocean Territory",
        "key": "IO"
    },
    {
        "label": "Brunei Darussalam",
        "key": "BN"
    },
    {
        "label": "Bulgaria",
        "key": "BG"
    },
    {
        "label": "Burkina Faso",
        "key": "BF"
    },
    {
        "label": "Burundi",
        "key": "BI"
    },
    {
        "label": "Cambodia",
        "key": "KH"
    },
    {
        "label": "Cameroon",
        "key": "CM"
    },
    {
        "label": "Canada",
        "key": "CA"
    },
    {
        "label": "Cape Verde",
        "key": "CV"
    },
    {
        "label": "Cayman Islands",
        "key": "KY"
    },
    {
        "label": "Central African Republic",
        "key": "CF"
    },
    {
        "label": "Chad",
        "key": "TD"
    },
    {
        "label": "Chile",
        "key": "CL"
    },
    {
        "label": "China",
        "key": "CN"
    },
    {
        "label": "Christmas Island",
        "key": "CX"
    },
    {
        "label": "Cocos (Keeling) Islands",
        "key": "CC"
    },
    {
        "label": "Colombia",
        "key": "CO"
    },
    {
        "label": "Comoros",
        "key": "KM"
    },
    {
        "label": "Congo",
        "key": "CG"
    },
    {
        "label": "Congo, the Democratic Republic of the",
        "key": "CD"
    },
    {
        "label": "Cook Islands",
        "key": "CK"
    },
    {
        "label": "Costa Rica",
        "key": "CR"
    },
    {
        "label": "Côte d'Ivoire",
        "key": "CI"
    },
    {
        "label": "Croatia",
        "key": "HR"
    },
    {
        "label": "Cuba",
        "key": "CU"
    },
    {
        "label": "Curaçao",
        "key": "CW"
    },
    {
        "label": "Cyprus",
        "key": "CY"
    },
    {
        "label": "Czech Republic",
        "key": "CZ"
    },
    {
        "label": "Denmark",
        "key": "DK"
    },
    {
        "label": "Djibouti",
        "key": "DJ"
    },
    {
        "label": "Dominica",
        "key": "DM"
    },
    {
        "label": "Dominican Republic",
        "key": "DO"
    },
    {
        "label": "Ecuador",
        "key": "EC"
    },
    {
        "label": "Egypt",
        "key": "EG"
    },
    {
        "label": "El Salvador",
        "key": "SV"
    },
    {
        "label": "Equatorial Guinea",
        "key": "GQ"
    },
    {
        "label": "Eritrea",
        "key": "ER"
    },
    {
        "label": "Estonia",
        "key": "EE"
    },
    {
        "label": "Ethiopia",
        "key": "ET"
    },
    {
        "label": "Falkland Islands (Malvinas)",
        "key": "FK"
    },
    {
        "label": "Faroe Islands",
        "key": "FO"
    },
    {
        "label": "Fiji",
        "key": "FJ"
    },
    {
        "label": "Finland",
        "key": "FI"
    },
    {
        "label": "France",
        "key": "FR"
    },
    {
        "label": "French Guiana",
        "key": "GF"
    },
    {
        "label": "French Polynesia",
        "key": "PF"
    },
    {
        "label": "French Southern Territories",
        "key": "TF"
    },
    {
        "label": "Gabon",
        "key": "GA"
    },
    {
        "label": "Gambia",
        "key": "GM"
    },
    {
        "label": "Georgia",
        "key": "GE"
    },
    {
        "label": "Germany",
        "key": "DE"
    },
    {
        "label": "Ghana",
        "key": "GH"
    },
    {
        "label": "Gibraltar",
        "key": "GI"
    },
    {
        "label": "Greece",
        "key": "GR"
    },
    {
        "label": "Greenland",
        "key": "GL"
    },
    {
        "label": "Grenada",
        "key": "GD"
    },
    {
        "label": "Guadeloupe",
        "key": "GP"
    },
    {
        "label": "Guam",
        "key": "GU"
    },
    {
        "label": "Guatemala",
        "key": "GT"
    },
    {
        "label": "Guernsey",
        "key": "GG"
    },
    {
        "label": "Guinea",
        "key": "GN"
    },
    {
        "label": "Guinea-Bissau",
        "key": "GW"
    },
    {
        "label": "Guyana",
        "key": "GY"
    },
    {
        "label": "Haiti",
        "key": "HT"
    },
    {
        "label": "Heard Island and McDonald Mcdonald Islands",
        "key": "HM"
    },
    {
        "label": "Holy See (Vatican City State)",
        "key": "VA"
    },
    {
        "label": "Honduras",
        "key": "HN"
    },
    {
        "label": "Hong Kong",
        "key": "HK"
    },
    {
        "label": "Hungary",
        "key": "HU"
    },
    {
        "label": "Iceland",
        "key": "IS"
    },
    {
        "label": "India",
        "key": "IN"
    },
    {
        "label": "Indonesia",
        "key": "ID"
    },
    {
        "label": "Iran, Islamic Republic of",
        "key": "IR"
    },
    {
        "label": "Iraq",
        "key": "IQ"
    },
    {
        "label": "Ireland",
        "key": "IE"
    },
    {
        "label": "Isle of Man",
        "key": "IM"
    },
    {
        "label": "Israel",
        "key": "IL"
    },
    {
        "label": "Italy",
        "key": "IT"
    },
    {
        "label": "Jamaica",
        "key": "JM"
    },
    {
        "label": "Japan",
        "key": "JP"
    },
    {
        "label": "Jersey",
        "key": "JE"
    },
    {
        "label": "Jordan",
        "key": "JO"
    },
    {
        "label": "Kazakhstan",
        "key": "KZ"
    },
    {
        "label": "Kenya",
        "key": "KE"
    },
    {
        "label": "Kiribati",
        "key": "KI"
    },
    {
        "label": "Kosovo",
        "key": "XK"
    },
    {
        "label": "Kuwait",
        "key": "KW"
    },
    {
        "label": "Kyrgyzstan",
        "key": "KG"
    },
    {
        "label": "Lao People's Democratic Republic",
        "key": "LA"
    },
    {
        "label": "Latvia",
        "key": "LV"
    },
    {
        "label": "Lebanon",
        "key": "LB"
    },
    {
        "label": "Lesotho",
        "key": "LS"
    },
    {
        "label": "Liberia",
        "key": "LR"
    },
    {
        "label": "Libya",
        "key": "LY"
    },
    {
        "label": "Liechtenstein",
        "key": "LI"
    },
    {
        "label": "Lithuania",
        "key": "LT"
    },
    {
        "label": "Luxembourg",
        "key": "LU"
    },
    {
        "label": "Macao",
        "key": "MO"
    },
    {
        "label": "Macedonia, the Former Yugoslav Republic of",
        "key": "MK"
    },
    {
        "label": "Madagascar",
        "key": "MG"
    },
    {
        "label": "Malawi",
        "key": "MW"
    },
    {
        "label": "Malaysia",
        "key": "MY"
    },
    {
        "label": "Maldives",
        "key": "MV"
    },
    {
        "label": "Mali",
        "key": "ML"
    },
    {
        "label": "Malta",
        "key": "MT"
    },
    {
        "label": "Marshall Islands",
        "key": "MH"
    },
    {
        "label": "Martinique",
        "key": "MQ"
    },
    {
        "label": "Mauritania",
        "key": "MR"
    },
    {
        "label": "Mauritius",
        "key": "MU"
    },
    {
        "label": "Mayotte",
        "key": "YT"
    },
    {
        "label": "Mexico",
        "key": "MX"
    },
    {
        "label": "Micronesia, Federated States of",
        "key": "FM"
    },
    {
        "label": "Moldova, Republic of",
        "key": "MD"
    },
    {
        "label": "Monaco",
        "key": "MC"
    },
    {
        "label": "Mongolia",
        "key": "MN"
    },
    {
        "label": "Montenegro",
        "key": "ME"
    },
    {
        "label": "Montserrat",
        "key": "MS"
    },
    {
        "label": "Morocco",
        "key": "MA"
    },
    {
        "label": "Mozambique",
        "key": "MZ"
    },
    {
        "label": "Myanmar",
        "key": "MM"
    },
    {
        "label": "Namibia",
        "key": "NA"
    },
    {
        "label": "Nauru",
        "key": "NR"
    },
    {
        "label": "Nepal",
        "key": "NP"
    },
    {
        "label": "Netherlands",
        "key": "NL"
    },
    {
        "label": "Netherlands Antilles",
        "key": "AN"
    },
    {
        "label": "New Caledonia",
        "key": "NC"
    },
    {
        "label": "New Zealand",
        "key": "NZ"
    },
    {
        "label": "Nicaragua",
        "key": "NI"
    },
    {
        "label": "Niger",
        "key": "NE"
    },
    {
        "label": "Nigeria",
        "key": "NG"
    },
    {
        "label": "Niue",
        "key": "NU"
    },
    {
        "label": "Norfolk Island",
        "key": "NF"
    },
    {
        "label": "Northern Mariana Islands",
        "key": "MP"
    },
    {
        "label": "Norway",
        "key": "NO"
    },
    {
        "label": "Oman",
        "key": "OM"
    },
    {
        "label": "Pakistan",
        "key": "PK"
    },
    {
        "label": "Palau",
        "key": "PW"
    },
    {
        "label": "Palestine, State of",
        "key": "PS"
    },
    {
        "label": "Panama",
        "key": "PA"
    },
    {
        "label": "Papua New Guinea",
        "key": "PG"
    },
    {
        "label": "Paraguay",
        "key": "PY"
    },
    {
        "label": "Peru",
        "key": "PE"
    },
    {
        "label": "Philippines",
        "key": "PH"
    },
    {
        "label": "Pitcairn",
        "key": "PN"
    },
    {
        "label": "Poland",
        "key": "PL"
    },
    {
        "label": "Portugal",
        "key": "PT"
    },
    {
        "label": "Puerto Rico",
        "key": "PR"
    },
    {
        "label": "Qatar",
        "key": "QA"
    },
    {
        "label": "Réunion",
        "key": "RE"
    },
    {
        "label": "Romania",
        "key": "RO"
    },
    {
        "label": "Russian Federation",
        "key": "RU"
    },
    {
        "label": "Rwanda",
        "key": "RW"
    },
    {
        "label": "Saint Barthélemy",
        "key": "BL"
    },
    {
        "label": "Saint Helena, Ascension and Tristan da Cunha",
        "key": "SH"
    },
    {
        "label": "Saint Kitts and Nevis",
        "key": "KN"
    },
    {
        "label": "Saint Lucia",
        "key": "LC"
    },
    {
        "label": "Saint Martin (French part)",
        "key": "MF"
    },
    {
        "label": "Saint Pierre and Miquelon",
        "key": "PM"
    },
    {
        "label": "Saint Vincent and the Grenadines",
        "key": "VC"
    },
    {
        "label": "Samoa",
        "key": "WS"
    },
    {
        "label": "San Marino",
        "key": "SM"
    },
    {
        "label": "Sao Tome and Principe",
        "key": "ST"
    },
    {
        "label": "Saudi Arabia",
        "key": "SA"
    },
    {
        "label": "Senegal",
        "key": "SN"
    },
    {
        "label": "Serbia",
        "key": "RS"
    },
    {
        "label": "Seychelles",
        "key": "SC"
    },
    {
        "label": "Sierra Leone",
        "key": "SL"
    },
    {
        "label": "Singapore",
        "key": "SG"
    },
    {
        "label": "Sint Maarten (Dutch part)",
        "key": "SX"
    },
    {
        "label": "Slovakia",
        "key": "SK"
    },
    {
        "label": "Slovenia",
        "key": "SI"
    },
    {
        "label": "Solomon Islands",
        "key": "SB"
    },
    {
        "label": "Somalia",
        "key": "SO"
    },
    {
        "label": "South Africa",
        "key": "ZA"
    },
    {
        "label": "South Georgia and the South Sandwich Islands",
        "key": "GS"
    },
    {
        "label": "South Sudan",
        "key": "SS"
    },
    {
        "label": "Spain",
        "key": "ES"
    },
    {
        "label": "Sri Lanka",
        "key": "LK"
    },
    {
        "label": "Sudan",
        "key": "SD"
    },
    {
        "label": "Suriname",
        "key": "SR"
    },
    {
        "label": "Svalbard and Jan Mayen",
        "key": "SJ"
    },
    {
        "label": "Swaziland",
        "key": "SZ"
    },
    {
        "label": "Sweden",
        "key": "SE"
    },
    {
        "label": "Switzerland",
        "key": "CH"
    },
    {
        "label": "Syrian Arab Republic",
        "key": "SY"
    },
    {
        "label": "Taiwan, Province of China",
        "key": "TW"
    },
    {
        "label": "Tajikistan",
        "key": "TJ"
    },
    {
        "label": "Tanzania, United Republic of",
        "key": "TZ"
    },
    {
        "label": "Thailand",
        "key": "TH"
    },
    {
        "label": "Timor-Leste",
        "key": "TL"
    },
    {
        "label": "Togo",
        "key": "TG"
    },
    {
        "label": "Tokelau",
        "key": "TK"
    },
    {
        "label": "Tonga",
        "key": "TO"
    },
    {
        "label": "Trinidad and Tobago",
        "key": "TT"
    },
    {
        "label": "Tunisia",
        "key": "TN"
    },
    {
        "label": "Turkey",
        "key": "TR"
    },
    {
        "label": "Turkmenistan",
        "key": "TM"
    },
    {
        "label": "Turks and Caicos Islands",
        "key": "TC"
    },
    {
        "label": "Tuvalu",
        "key": "TV"
    },
    {
        "label": "Uganda",
        "key": "UG"
    },
    {
        "label": "Ukraine",
        "key": "UA"
    },
    {
        "label": "United Arab Emirates",
        "key": "AE"
    },
    {
        "label": "United Kingdom",
        "key": "GB"
    },
    {
        "label": "United States",
        "key": "US"
    },
    {
        "label": "United States Minor Outlying Islands",
        "key": "UM"
    },
    {
        "label": "Uruguay",
        "key": "UY"
    },
    {
        "label": "Uzbekistan",
        "key": "UZ"
    },
    {
        "label": "Vanuatu",
        "key": "VU"
    },
    {
        "label": "Venezuela, Bolivarian Republic of",
        "key": "VE"
    },
    {
        "label": "Viet Nam",
        "key": "VN"
    },
    {
        "label": "Virgin Islands, British",
        "key": "VG"
    },
    {
        "label": "Virgin Islands, U.S.",
        "key": "VI"
    },
    {
        "label": "Wallis and Futuna",
        "key": "WF"
    },
    {
        "label": "Western Sahara",
        "key": "EH"
    },
    {
        "label": "Yemen",
        "key": "YE"
    },
    {
        "label": "Zambia",
        "key": "ZM"
    },
    {
        "label": "Zimbabwe",
        "key": "ZW"
    }
];

const FilterSportCountry: React.FC<sendData> = (sendData) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('sports'); // Set "sports" as default
    const [data, setData] = useState<Entry[]>([]); // Set "sportItems" as default
    const [dropdowndata, setDropDown] = useState<string>('');

    useEffect(() => {
        setData(sportItems);
        setDropDown("1");
    }, []);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        sendData.dataHandle(dropdowndata);
        sendData.catagoryHandle(selectedCategory);
    }, [dropdowndata]);
     /* eslint-enable */

    const handleCategoryChange = async (e: RadioChangeEvent) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        if (selectedValue === 'sports') {
            setData(sportItems);
            setDropDown("1");
        } else {
            setData(countryItems);
            setDropDown("AF");
        }
    };

    const handleSelect = (value: string) => {
        console.log(`Selected: ${value}`);
        // Do something with the selected value here
        setDropDown(value);
    };

    return (
        <div className='flex justify-center'>
            <div className='text-2xl font-primary text-white mr-5 font-semi-bold'>Filter:</div>
            <Radio.Group onChange={handleCategoryChange} value={selectedCategory} className='font-primary'>
                <Radio value="sports">Sports</Radio>
                <Radio value="country">Country</Radio>
            </Radio.Group>
            <DropdownMenu data={data} handleSelect={handleSelect} />
        </div>
    );
};

export default FilterSportCountry;

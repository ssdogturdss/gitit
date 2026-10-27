# CHIP OS
git clone https://github.com/ssdogturdss/chip-os.git
cd chip-os
npm install
npx expo start --tunnel
# For TestFlight:
eas login
eas build --platform ios
eas submit --platform ios --latest
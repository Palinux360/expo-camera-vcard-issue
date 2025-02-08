# Expo Camera vCard Issue (Android)

## Description
This repository provides a minimal reproducible example of a bug in `expo-camera` when scanning **vCard QR codes on Android**. While `expo-camera` correctly reads QR codes containing **URLs and text**, it **fails to properly decode vCard data on Android**, returning only the contact's name instead of the full vCard.

This issue does not occur on iOS, where the vCard QR code is read correctly.

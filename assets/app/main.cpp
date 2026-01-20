// Scripted and Developed by RAP.net (FULL STACK DEVELOPER)

#include <opencv2/opencv.hpp>
#include <iostream>
#include <fstream>
#include <nlohmann/json.hpp>
#include "object_detector.h"

using json = nlohmann::json;
using namespace std;
using namespace cv;

int main() {
    // load database
    ifstream dbFile("app-data.json");
    json db;
    dbFile >> db;

    // Camera (Open)
    VideoCapture cap(0);
    if (!cap.isOpened()) {
        cerr << "Cannot open camera" << endl;
        return 1;
    }

    ObjectDetector detector;
    cout << "Press 'q' to scan object..." << endl;

    Mat frame;
    while (true) {
        cap >> frame;
        if (frame.empty()) break;

        imshow("Camera Feed", frame);
        char c = (char)waitKey(30);
        if (c == 'q') {
            string detectedObject = detector.detectObject(frame);
            
            if (detectedObject == "Person") {
                cout << "Human detection is not supported!" << endl;
            } else if (db.containts(DetectedObject)) {
                auto info = db[detectedObject];
                cout << "Object: " << detectedObject << endl;
                cout << "Category: " << info["category"] << endl;
                cout << "Common Issues: " << info["issues"] << endl;
                cout << "Solutions: " << info["solutions"] << endl;
                cout << "Safety Tips: " << info["safety"] << endl;
            } else {
                cout << "No information found for this object." << endl;
            }
            break;
        }
    }

    cap.release();
    destroyAllWindows();
    return 0;
}
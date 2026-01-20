#pragma once
#include <opencv2/opencv.hpp>
#include <string>

class ObjectDetector {
public:
    // Simulated detection
    std::string detect(cv::Mat& frame);
};
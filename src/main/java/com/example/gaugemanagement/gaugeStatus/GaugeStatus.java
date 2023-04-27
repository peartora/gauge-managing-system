package com.example.gaugemanagement.gaugeStatus;

public enum GaugeStatus
{
    사용중(0), QMM2전달(1), 견적수령(2), 오더확인(3), 입고(4), 사용금지(5), 기한만료1달전(6);

    int statusValue;

    GaugeStatus(int statusValue)
    {
        this.statusValue = statusValue;
    }
}

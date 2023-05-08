package com.example.gaugemanagement.gaugeStatus;

public enum GaugeStatus
{
    유효(0), 유효기간초과(1), 유효기간만료1달미만(2), 수출대기(3);

    int statusValue;

    GaugeStatus(int statusValue)
    {
        this.statusValue = statusValue;
    }




}
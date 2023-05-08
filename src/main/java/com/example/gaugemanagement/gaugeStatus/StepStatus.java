package com.example.gaugemanagement.gaugeStatus;

public enum StepStatus
{
    PENDING(0), DONE(1);

    int statusValue;

    StepStatus(int statusValue)
    {
        this.statusValue = statusValue;
    }
}

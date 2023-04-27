package com.example.gaugemanagement.returnEntity;

import com.example.gaugemanagement.gaugeStatus.GaugeStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GaugeEntity
{
    private String gaugeNumber;
    private LocalDate validUntil;
    private String gaugeStatus;
    private LocalDate sendDateToQmm2;
    private boolean isQuotationReceived;
    private boolean isGaugeSent;
    private boolean isOrderConfirmed;
    private boolean isGaugeArrivedBackToDaep;
    private String gaugeDescription;
    private String engineer;
}

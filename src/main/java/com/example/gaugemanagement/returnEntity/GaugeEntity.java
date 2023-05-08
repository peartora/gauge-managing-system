package com.example.gaugemanagement.returnEntity;

import com.example.gaugemanagement.gaugeStatus.GaugeStatus;
import jakarta.annotation.Nullable;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GaugeEntity
{
    private String gaugeNumber;
    private LocalDate validUntil;
    private String gaugeStatus;
    @Nullable
    private LocalDate sendDateToQmm2;
    private String isQuotationReceived;
    private String isGaugeSent;
    private String isOrderConfirmed;
    private String isGaugeArrivedBackToDaep;
    private String gaugeDescription;
    private String engineer;
}

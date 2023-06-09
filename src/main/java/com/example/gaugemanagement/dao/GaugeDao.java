package com.example.gaugemanagement.dao;

import com.example.gaugemanagement.returnEntity.GaugeEntity;

import java.util.List;
import java.util.Map;

public interface GaugeDao
{

    List<GaugeEntity> returnGaugeList(Map<String, Object> params);
    int recordDate(Map<String, Object> params);
    int recordGauge(Map<String, Object> params);
    int update(Map<String, Object> params);

}

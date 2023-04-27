package com.example.gaugemanagement.dao;

import com.example.gaugemanagement.returnEntity.GaugeEntity;

import java.util.List;
import java.util.Map;

public interface GaugeDao
{

    List<GaugeEntity> returnGaugeList(Map<String, Object> params);
}

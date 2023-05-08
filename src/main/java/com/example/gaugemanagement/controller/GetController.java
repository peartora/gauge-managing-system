package com.example.gaugemanagement.controller;

import com.example.gaugemanagement.dao.GaugeDao;
import com.example.gaugemanagement.returnEntity.GaugeEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/gauge-managing-system")
@RequiredArgsConstructor
public class GetController
{
    private final GaugeDao gaugeDaoImpl;

    @GetMapping("/getGaugeList")
    public List<GaugeEntity> returnGaugeList(@RequestParam Map<String, Object> params)
    {
//        @RequestParam Map<String, Object> params

        System.out.println("params");
        System.out.println(params);

        return this.gaugeDaoImpl.returnGaugeList(params);
    }
}

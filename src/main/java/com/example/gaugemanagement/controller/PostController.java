package com.example.gaugemanagement.controller;

import com.example.gaugemanagement.dao.GaugeDao;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/gauge-managing-system")
@RequiredArgsConstructor
public class PostController
{
    private final GaugeDao gaugeDaoImpl;

    @PostMapping("/recordDate")
    public String recordDate(@RequestBody Map<String, Object> params)
    {
        int numberOfAffectedRows  = this.gaugeDaoImpl.recordDate(params);

        if (numberOfAffectedRows == 1)
        {
            return "QMM2 전달 날짜가 등록 되었습니다.";
        }
        else
        {
            return "제대로 등록 되지 않았습니다.";
        }
    }
}

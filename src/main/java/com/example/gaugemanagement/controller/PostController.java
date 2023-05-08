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
        System.out.println("params");
        System.out.println(params);

        int numberOfAffectedRows  = this.gaugeDaoImpl.recordDate(params);

        if (numberOfAffectedRows == 1)
        {
            return "QMM2 전달 날짜가 등록 되었고, 게이지의 상태가 사용금지로 변경 되었습니다.";
        }
        else
        {
            return "제대로 등록 되지 않았습니다.";
        }
    }

    @PostMapping("/recordGauge")
    public String recordGauge(@RequestBody Map<String, Object> params)
    {
        System.out.println("params");
        System.out.println(params);


        int numberOfAffectedRows  = this.gaugeDaoImpl.recordGauge(params);

        if (numberOfAffectedRows == 1)
        {
            return "게이지가 등록 되었습니다.";
        }
        else
        {
            return "제대로 등록 되지 않았습니다.";
        }
    }

    @PostMapping("/update")
    public String update(@RequestBody Map<String, Object> params)
    {
        System.out.println("params");
        System.out.println(params);

        int numberOfAffectedRows  = this.gaugeDaoImpl.update(params);

        if (numberOfAffectedRows == 1)
        {
            return "상태 변경 되었습니다.";
        }
        else
        {
            return "상태 변경 중 error가 발생 하였습니다.";
        }
    }
}

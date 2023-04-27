package com.example.gaugemanagement.dao;

import com.example.gaugemanagement.returnEntity.GaugeEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
@RequiredArgsConstructor
public class GaugeDaoImpl implements GaugeDao
{
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Override
    public List<GaugeEntity> returnGaugeList(Map<String, Object> params)
    {
        String sql = "select * from `gauge-list` where 1=1";

        for (String key: params.keySet())
        {
            System.out.println("key");
            System.out.println(key);

            String value = (String) params.get(key);

            System.out.println("value");
            System.out.println(value);

            if (!Objects.equals(value, ""))
            {
                if (!Objects.equals(value, "All"))
                {
                    if (!(params.get(key) instanceof String))
                    {
                        sql += " AND " + "`" + key + "`" + " = " + params.get(key);
                    }
                    else
                    {
                        sql += " AND " + "`" + key + "`" + " = " + '"' + params.get(key) + '"';
                    }
                }
            }
        }

        System.out.println(sql);

        return this.namedParameterJdbcTemplate.query(sql, (rs, rowNum) ->
        {
            GaugeEntity gaugeEntity = new GaugeEntity();

            Date validUltil = rs.getDate("valid-until");
            LocalDate localDateValidUntil = validUltil.toLocalDate();

            Date sendDateToQmm2;
            LocalDate localDateSendDateToQmm2 = null;

            try
            {
                sendDateToQmm2 = rs.getDate("send-date-qmm2");
                localDateSendDateToQmm2 = sendDateToQmm2.toLocalDate();
            }
            catch (NullPointerException e)
            {
                gaugeEntity.setSendDateToQmm2(null);
            }

            gaugeEntity.setGaugeNumber(rs.getString("gauge-number"));
            gaugeEntity.setValidUntil(localDateValidUntil);
            gaugeEntity.setGaugeStatus(rs.getString("gauge-status"));
            gaugeEntity.setSendDateToQmm2(localDateSendDateToQmm2);
            gaugeEntity.setQuotationReceived(rs.getBoolean("is-quotation-recieved"));
            gaugeEntity.setGaugeSent(rs.getBoolean("is-gauge-sent"));
            gaugeEntity.setOrderConfirmed(rs.getBoolean("is-orderconfirmed"));
            gaugeEntity.setGaugeArrivedBackToDaep(rs.getBoolean("is-gauge-arrived-back-to-daep"));
            gaugeEntity.setGaugeDescription(rs.getString("gauge-description"));
            gaugeEntity.setEngineer(rs.getString("person"));

            return gaugeEntity;
        });
    }

//    public void setGaugeStatus(LocalDate validUntil)
//    {
//        LocalDate today = LocalDate.now();
//        LocalDate oneMonthFromNow = today.plusMonths(1);
//
//
//        if (validUntil.isAfter(oneMonthFromNow))
//        {
//            // 1달 이상 남음
//        }
//    }
}

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
    private LocalDate localDateValidUntil;

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

            Date validUntil = rs.getDate("valid-until");
            LocalDate localDateValidDate = validUntil.toLocalDate();

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
            gaugeEntity.setValidUntil(localDateValidDate);

            gaugeEntity.setGaugeStatus(rs.getString("gauge-status"));
            gaugeEntity.setSendDateToQmm2(localDateSendDateToQmm2);
            gaugeEntity.setIsQuotationReceived(rs.getString("is-quotation-recieved"));
            gaugeEntity.setIsGaugeSent(rs.getString("is-gauge-sent"));
            gaugeEntity.setIsOrderConfirmed(rs.getString("is-orderconfirmed"));
            gaugeEntity.setIsGaugeArrivedBackToDaep(rs.getString("is-gauge-arrived-back-to-daep"));
            gaugeEntity.setGaugeDescription(rs.getString("gauge-description"));
            gaugeEntity.setEngineer(rs.getString("person"));

            return gaugeEntity;
        });
    }

    @Override
    public int recordDate(Map<String, Object> params)
    {
        return this.namedParameterJdbcTemplate.update("update `gauge-list` set `send-date-qmm2` = now() where `gauge-number` = :gaugeNumber", params);
    }

    @Override
    public int recordGauge(Map<String, Object> params)
    {
        String strValidUntil = (String) params.get("validUntil");
        LocalDate validUntil = LocalDate.parse(strValidUntil);
        params.put("gaugeStatus", setGaugeStatus(validUntil));

        return this.namedParameterJdbcTemplate.update("insert into `gauge-list` (`gauge-number`, `valid-until`, `gauge-status`, `gauge-description`, `manufacturing-number`, `person`) values (:gaugeNumber, :validUntil, :gaugeStatus, :description, :manufacturingNumber, :person)", params);
    }

    private String setGaugeStatus(LocalDate validUntil)
    {
        LocalDate oneMonthAgoFromValidUntil = validUntil.minusMonths(1);
        LocalDate today = LocalDate.now();

        if (today.isBefore(validUntil))
        {
            if (today.isBefore(oneMonthAgoFromValidUntil))
            {
                return "유효";
            }
            else
            {
                return "유효기간만료1달미만";
            }
        }
        else
        {
            return "유효기간초과";
        }
    }
}

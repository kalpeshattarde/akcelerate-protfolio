import { LineChart as LineIcon } from "lucide-react";
import { Area, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard, EmptyState } from "../AdminPolish";

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  fontSize: 12,
};

export interface AbDailyRow {
  date: string;
  control: number;
  controlBand: [number, number];
  "catalog-early": number;
  expBand: [number, number];
}

interface Props {
  data: AbDailyRow[];
  index?: number;
}

export default function AbTrendChart({ data, index = 1 }: Props) {
  const hasData = data.some(d => d.control > 0 || d["catalog-early"] > 0);

  return (
    <ChartCard title="A/B Cart Rate Over Time (Last 7 Days)" index={index}>
      {hasData ? (
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v: number | [number, number], name: string) => {
                if (Array.isArray(v)) return [`${v[0]}% – ${v[1]}%`, name];
                return [`${v}%`, name];
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="controlBand" name="control 95% CI" stroke="none" fill="hsl(var(--muted-foreground))" fillOpacity={0.15} activeDot={false} legendType="none" />
            <Area type="monotone" dataKey="expBand" name="catalog-early 95% CI" stroke="none" fill="hsl(var(--primary))" fillOpacity={0.15} activeDot={false} legendType="none" />
            <Line type="monotone" dataKey="control" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={{ r: 3 }} animationDuration={900} />
            <Line type="monotone" dataKey="catalog-early" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} animationDuration={900} animationBegin={150} />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState icon={LineIcon} title="No A/B trend data yet" description="Cart rate per variant will appear here once events accumulate." />
      )}
    </ChartCard>
  );
}

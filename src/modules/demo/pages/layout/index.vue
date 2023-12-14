<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card :span="3">
        <t-tabs>
          <t-tab-panel value="process" label="工序"> 工序 </t-tab-panel>
          <t-tab-panel value="route" label="工艺路线"> 工艺路线 </t-tab-panel>
        </t-tabs>
      </cmp-card>
      <cmp-card :span="6">
        <t-tabs :addable="true">
          <t-tab-panel :value="1" label="SN" :removable="true"> SN </t-tab-panel>
          <t-tab-panel :value="2" label="流程卡" :removable="true"> 流程卡 </t-tab-panel>
        </t-tabs>
      </cmp-card>
      <cmp-card :span="3" :ghost="true">
        <cmp-container :full="true">
          <cmp-card>
            <t-tabs>
              <t-tab-panel value="api" label="API"> API </t-tab-panel>
              <t-tab-panel value="script" label="Script"> Script </t-tab-panel>
            </t-tabs>
          </cmp-card>
          <cmp-card> bottom corner </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

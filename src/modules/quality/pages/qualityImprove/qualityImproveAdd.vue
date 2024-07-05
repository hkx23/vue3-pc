<template>
  <t-dialog
    v-model:visible="mainDialogVisible"
    :close-on-overlay-click="false"
    :header="props.title"
    mode="full-screen"
    :cancel-btn="null"
    :confirm-btn="null"
    class="full-screen-dialog-flex"
  >
    <cmp-container :full="true">
      <cmp-card :ghost="true">
        <cmp-container :full="true" :full-sub-index="[1]">
          <cmp-card :ghost="true">
            <!-- !提交暂存模块 -->
            <t-row v-if="alertReject" style="display: flex; justify-content: center">
              <t-alert theme="error">{{ alertRejectMessage }}</t-alert>
            </t-row>
            <!-- <t-row justify="space-between" align="center">
            <t-col>
              <t-button v-if="formData.operateType !== 'check'" @click="onSubmit">{{
                t('common.button.save')
              }}</t-button>
              <t-button v-if="formData.operateType !== 'check'" theme="default" @click="onStaging">{{
                t('qualityImprove.staging')
              }}</t-button>
              <t-button
                v-if="formData.status != 'DRAFT' && formData.operateType != 'check'"
                theme="default"
                @click="formVisibleReject = true"
                >{{ t('qualityImprove.reject') }}</t-button
              >
            </t-col>
            <close-icon :style="{ cursor: 'pointer' }" @click="onClose" />
          </t-row> -->
            <t-row v-if="formData.status !== 'DRAFT' && formData.improveTool === '8D'" style="margin-top: 12px">
              <t-steps :current="currentStage" readonly class="main-steps">
                <t-step-item :title="t('qualityImprove.Launch')" />
                <t-step-item :title="t('qualityImprove.8dStepOne')" />
                <t-step-item :title="t('qualityImprove.8dStepTwo')" />
                <t-step-item :title="t('qualityImprove.8dStepThere')" />
                <t-step-item :title="t('qualityImprove.8dStepFour')" />
                <t-step-item :title="t('qualityImprove.8dStepFive')" />
                <t-step-item :title="t('qualityImprove.8dStepSix')" />
                <t-step-item :title="t('qualityImprove.8dStepSeven')" />
                <t-step-item :title="t('qualityImprove.8dStepEight')" />
              </t-steps>
            </t-row>
            <t-row v-if="formData.status !== 'DRAFT' && formData.improveTool === 'PDCA'" style="margin-top: 12px">
              <t-steps :current="currentStage" readonly class="main-steps">
                <t-step-item :title="t('qualityImprove.Launch')" />
                <t-step-item :title="t('qualityImprove.PDCAP')" />
                <t-step-item :title="t('qualityImprove.PDCAD')" />
                <t-step-item :title="t('qualityImprove.PDCAC')" />
                <t-step-item :title="t('qualityImprove.PDCAA')" />
              </t-steps>
            </t-row>
          </cmp-card>
          <cmp-card
            :ghost="true"
            :class="{
              'not-full-tab': !tagValue,
              'full-tab': tagValue,
            }"
          >
            <t-tabs v-model="tagValue">
              <t-tab-panel :value="0" :label="t('qualityImprove.mainInfo')" :destroy-on-hide="false">
                <template #panel>
                  <cmp-container :full="false" class="tab-add-padding-bottom">
                    <!-- !基础信息模块 -->
                    <cmp-card :hover-shadow="false" class="card-borded">
                      <cmp-container>
                        <t-row justify="space-between" align="center">
                          <t-col>
                            <span class="span_title">{{ t('qualityImprove.baseInfo') }}</span>
                            <span style="margin-left: 10px">{{ formData.billNo }}</span>
                          </t-col>
                        </t-row>
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="110px"
                          style="margin-top: 12px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.inspectionType')"
                                label-align="right"
                                name="inspectType"
                              >
                                <t-select
                                  v-model="formData.inspectType"
                                  style="width: 100%"
                                  :disabled="formData.id !== ''"
                                  @change="onChangeType"
                                >
                                  <t-option
                                    v-for="item in inspectTypeOption"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.value"
                                  />
                                </t-select>
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.relateBillNo')"
                                label-align="right"
                                name="relateBillNo"
                              >
                                <t-select
                                  v-model="formData.relateBillNo"
                                  :placeholder="t('qualityImprove.selectBillNo')"
                                  style="width: 100%"
                                  filterable
                                  input-props
                                  :disabled="formData.id !== ''"
                                  @change="onChangeBillNo"
                                  @input-change="querySelectChange($event)"
                                >
                                  <t-option
                                    v-for="item in billNoOption"
                                    :key="item.id"
                                    :label="item.billNo"
                                    :value="item.billNo"
                                  />
                                </t-select>
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.mitemCode')" label-align="right" name="mitemCode">
                                <t-input
                                  v-model="formData.mitemCode"
                                  :placeholder="formData.relateBillNo ? '' : t('qualityImprove.selectRelateBillNo')"
                                  style="width: 100%"
                                  :disabled="true"
                                />
                              </t-form-item>
                            </t-col>
                            <!-- 第 2️⃣ 行数据 -->
                            <t-col :span="4">
                              <t-form-item :label="t('business.main.mitemDesc')" label-align="right" name="mitemDesc">
                                <t-input
                                  v-model="formData.mitemDesc"
                                  :placeholder="formData.relateBillNo ? '' : t('qualityImprove.selectRelateBillNo')"
                                  style="width: 100%"
                                  :disabled="true"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.supplierCode')"
                                label-align="right"
                                name="supplierCode"
                              >
                                <t-input
                                  v-model="formData.supplierCode"
                                  :placeholder="formData.relateBillNo ? '' : t('qualityImprove.selectRelateBillNo')"
                                  style="width: 100%"
                                  :disabled="true"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.supplierName')"
                                label-align="right"
                                name="supplierName"
                              >
                                <t-input
                                  v-model="formData.supplierName"
                                  :placeholder="formData.relateBillNo ? '' : t('qualityImprove.selectRelateBillNo')"
                                  style="width: 100%"
                                  :disabled="true"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('business.main.workshop')" label-align="right" name="workshopName">
                                <t-input
                                  v-model="formData.workshopName"
                                  :placeholder="formData.relateBillNo ? '' : t('qualityImprove.selectRelateBillNo')"
                                  style="width: 100%"
                                  :disabled="true"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('business.main.workcenter')"
                                label-align="right"
                                name="workcenterName"
                              >
                                <t-input
                                  v-model="formData.workcenterName"
                                  :placeholder="formData.relateBillNo ? '' : t('qualityImprove.selectRelateBillNo')"
                                  style="width: 100%"
                                  :disabled="true"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.moScheCode')" label-align="right" name="scheCode">
                                <t-input
                                  v-model="formData.scheCode"
                                  :placeholder="formData.relateBillNo ? '' : t('qualityImprove.selectRelateBillNo')"
                                  style="width: 100%"
                                  :disabled="true"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.defectCategory')"
                                label-align="right"
                                name="defectCategory"
                              >
                                <t-input
                                  v-model="formData.defectCategoryName"
                                  :placeholder="formData.relateBillNo ? '' : t('qualityImprove.selectRelateBillNo')"
                                  style="width: 100%"
                                  :disabled="true"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.handleMethod')"
                                label-align="right"
                                name="handleMethod"
                              >
                                <t-input
                                  v-model="formData.handleMethod"
                                  :placeholder="formData.relateBillNo ? '' : t('qualityImprove.selectRelateBillNo')"
                                  style="width: 100%"
                                  :disabled="true"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.deptResponsibility')"
                                label-align="right"
                                name="deptResponsibilityId"
                              >
                                <bcmp-select-business
                                  v-model="formData.deptResponsibilityId"
                                  :disabled="formData.status !== 'DRAFT' || formData.operateType === 'check'"
                                  type="admin_org"
                                  :show-title="false"
                                  style="width: 100%"
                                ></bcmp-select-business>
                              </t-form-item>
                            </t-col>

                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.personResponsibility')"
                                label-align="right"
                                name="personResponsibilityName"
                              >
                                <t-input
                                  v-model="formData.personResponsibilityName"
                                  :placeholder="formData.relateBillNo ? '' : t('qualityImprove.selectRelateBillNo')"
                                  style="width: 100%"
                                  :disabled="true"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.occurNature')"
                                label-align="right"
                                name="occurNature"
                              >
                                <t-select
                                  v-model="formData.occurNature"
                                  clearable
                                  style="width: 100%"
                                  :disabled="formData.status !== 'DRAFT' || formData.operateType === 'check'"
                                >
                                  <t-option
                                    v-for="item in occurNatureOption"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.value"
                                  />
                                </t-select>
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.isBatch')" label-align="right" name="isBatch">
                                <t-select
                                  v-model="formData.isBatch"
                                  :clearable="true"
                                  style="width: 100%"
                                  :disabled="formData.status !== 'DRAFT' || formData.operateType === 'check'"
                                >
                                  <t-option
                                    v-for="item in isBatchOption"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.value"
                                  />
                                </t-select>
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.userResponsibility')"
                                label-align="right"
                                name="userResponsibilityName"
                              >
                                <bcmp-select-business
                                  v-model="formData.userResponsibilityId"
                                  :disabled="formData.status !== 'DRAFT' || formData.operateType === 'check'"
                                  type="person"
                                  :show-title="false"
                                  style="width: 100%"
                                ></bcmp-select-business>
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.datetimeRequireFinish')"
                                label-align="right"
                                name="datetimeRequireFinish"
                              >
                                <t-date-picker
                                  v-model="formData.datetimeRequireFinish"
                                  enable-time-picker
                                  allow-input
                                  clearable
                                  style="width: 100%"
                                  :disabled="formData.status !== 'DRAFT' || formData.operateType === 'check'"
                                  format="YYYY-MM-DD hh:mm:ss"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item
                                :label="t('qualityImprove.improveTool')"
                                label-align="right"
                                name="improveTool"
                              >
                                <t-select
                                  v-model="formData.improveTool"
                                  style="width: 100%"
                                  :disabled="improveToolOp || formData.operateType === 'check'"
                                >
                                  <t-option key="PDCA" label="PDCA" value="PDCA" />
                                  <t-option key="8D" label="8D" value="8D" />
                                </t-select>
                              </t-form-item>
                            </t-col>
                            <t-col :span="12">
                              <t-form-item
                                :label="t('qualityImprove.problemDesc')"
                                label-align="right"
                                name="problemDesc"
                              >
                                <t-input
                                  v-model="formData.problemDesc"
                                  style="width: 100%"
                                  :placeholder="t('common.placeholder.input')"
                                  :disabled="formData.status !== 'DRAFT' || formData.operateType === 'check'"
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="12">
                              <t-form-item
                                :label="t('qualityImprove.problemDescAdd')"
                                label-align="right"
                                name="problemDescAdd"
                              >
                                <t-textarea
                                  v-model="formData.problemDescAdd"
                                  style="width: 100%"
                                  :disabled="formData.status !== 'DRAFT' || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <!-- 第 4️⃣ 行数据 -->
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisible = true">
                                  <div v-if="formData.status !== 'DRAFT' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-container>
                    </cmp-card>
                    <!-- // PDCA -->
                    <div v-if="formData.status !== 'DRAFT' && formData.improveTool === 'PDCA'" style="margin-top: 0">
                      <cmp-card
                        v-show="Number(improvePdca.status) > 0"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 0"
                        class="card-borded"
                      >
                        <t-row justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.PDCAP') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improvePdca.userPlanName }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improvePdca.datetimePlan }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="100px"
                          style="margin-top: 10px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item :label="t('qualityImprove.plan')" label-align="right" name="planDesc">
                                <t-textarea
                                  v-model="improvePdca.planDesc"
                                  :disabled="Number(improvePdca.status) > 1 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="12">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleP = true">
                                  <div v-if="improvePdca.status !== '1' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                      <cmp-card
                        v-show="Number(improvePdca.status) > 1"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 12px"
                        class="card-borded"
                      >
                        <t-row justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.PDCAD') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improvePdca.userDoName }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improvePdca.datetimeDo }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="110px"
                          style="margin-top: 12px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item :label="t('qualityImprove.do')" label-align="right" name="doDesc">
                                <t-textarea
                                  v-model="improvePdca.doDesc"
                                  :disabled="Number(improvePdca.status) > 2 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleD = true">
                                  <div v-if="improvePdca.status !== '2' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                      <cmp-card
                        v-show="Number(improvePdca.status) > 2"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 12px"
                        class="card-borded"
                      >
                        <t-row justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.PDCAC') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improvePdca.userCheckName }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improvePdca.datetimeCheck }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="120px"
                          style="margin-top: 10px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item :label="t('qualityImprove.check')" label-align="right" name="checkDesc">
                                <t-textarea
                                  v-model="improvePdca.checkDesc"
                                  :disabled="Number(improvePdca.status) > 3 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleC = true">
                                  <div v-if="improvePdca.status !== '3' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                      <cmp-card
                        v-show="Number(improvePdca.status) > 3"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 12px"
                        class="card-borded"
                      >
                        <t-row justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.PDCAA') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improvePdca.userActName }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improvePdca.datetimeAct }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="120px"
                          style="margin-top: 10px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item :label="t('qualityImprove.act')" label-align="right" name="actDesc">
                                <t-textarea
                                  v-model="improvePdca.actDesc"
                                  :disabled="Number(improvePdca.status) > 4 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleA = true">
                                  <div v-if="improvePdca.status !== '4' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                    </div>
                    <!-- 8D -->
                    <div v-if="formData.status !== 'DRAFT' && formData.improveTool === '8D'" style="margin-top: 0">
                      <cmp-card
                        v-show="Number(improve8d.status) > 0"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 0"
                        class="card-borded"
                      >
                        <t-row justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.8dStepOne') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improve8d.userD1Name }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improve8d.datetimeD1 }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="110px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item :label="t('qualityImprove.createGroup')" label-align="right" name="d1Desc">
                                <t-textarea
                                  v-model="improve8d.d1Desc"
                                  :disabled="Number(improve8d.status) > 1 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="12">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleD1 = true">
                                  <div v-if="improve8d.status !== '1' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                      <cmp-card
                        v-show="Number(improve8d.status) > 1"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 12px"
                        class="card-borded"
                      >
                        <t-row justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.8dStepTwo') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improve8d.userD2Name }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improve8d.datetimeD2 }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="120px"
                          style="margin-top: 10px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item :label="t('qualityImprove.problemDesc')" label-align="right" name="d2Desc">
                                <t-textarea
                                  v-model="improve8d.d2Desc"
                                  :disabled="Number(improve8d.status) > 2 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleD2 = true">
                                  <div v-if="improve8d.status !== '2' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                      <cmp-card
                        v-show="Number(improve8d.status) > 2"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 12px"
                        class="card-borded"
                      >
                        <t-row justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.8dStepThere') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improve8d.userD3Name }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improve8d.datetimeD3 }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="120px"
                          style="margin-top: 10px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item
                                :label="t('qualityImprove.analyzeReasons')"
                                label-align="right"
                                name="d3Desc"
                              >
                                <t-textarea
                                  v-model="improve8d.d3Desc"
                                  :disabled="Number(improve8d.status) > 3 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleD3 = true">
                                  <div v-if="improve8d.status !== '3' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                      <cmp-card
                        v-show="Number(improve8d.status) > 3"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 12px"
                        class="card-borded"
                      >
                        <t-row justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.8dStepFour') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improve8d.userD4Name }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improve8d.datetimeD4 }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="120px"
                          style="margin-top: 10px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item
                                :label="t('qualityImprove.emergencyMeasures')"
                                label-align="right"
                                name="d4Desc"
                              >
                                <t-textarea
                                  v-model="improve8d.d4Desc"
                                  :disabled="Number(improve8d.status) > 4 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleD4 = true">
                                  <div v-if="improve8d.status !== '4' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                      <cmp-card
                        v-show="Number(improve8d.status) > 4"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 12px"
                        class="card-borded"
                      >
                        <t-row justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.8dStepFive') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improve8d.userD5Name }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improve8d.datetimeD5 }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="120px"
                          style="margin-top: 10px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item
                                :label="t('qualityImprove.preventiveMeasures')"
                                label-align="right"
                                name="d5Desc"
                              >
                                <t-textarea
                                  v-model="improve8d.d5Desc"
                                  :disabled="Number(improve8d.status) > 5 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleD5 = true">
                                  <div v-if="improve8d.status !== '5' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                      <cmp-card
                        v-show="Number(improve8d.status) > 5"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 12px"
                        class="card-borded"
                      >
                        <t-row style="margin-left: 10px" justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.8dStepSix') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improve8d.userD6Name }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improve8d.datetimeD6 }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="120px"
                          style="margin-top: 10px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item
                                :label="t('qualityImprove.preventRecurrence')"
                                label-align="right"
                                name="d6Desc"
                              >
                                <t-textarea
                                  v-model="improve8d.d6Desc"
                                  :disabled="Number(improve8d.status) > 6 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleD6 = true">
                                  <div v-if="improve8d.status !== '6' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                      <cmp-card
                        v-show="Number(improve8d.status) > 6"
                        :hover-shadow="false"
                        :ghost="true"
                        style="margin-top: 12px"
                        class="card-borded"
                      >
                        <t-row justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.8dStepSeven') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improve8d.userD7Name }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improve8d.datetimeD7 }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="122px"
                          style="margin-top: 10px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item
                                :label="t('qualityImprove.executionEffectTrackingVerification')"
                                label-align="right"
                                name="d7Desc"
                              >
                                <t-textarea
                                  v-model="improve8d.d7Desc"
                                  :disabled="Number(improve8d.status) > 7 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleD7 = true">
                                  <div v-if="improve8d.status !== '7' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                      <cmp-card
                        v-show="Number(improve8d.status) > 7"
                        :hover-shadow="false"
                        :ghost="false"
                        style="margin-top: 12px"
                        class="card-borded"
                      >
                        <t-row style="margin-left: 10px" justify="space-between" align="center"
                          ><t-col>
                            <span class="span_title">{{ t('qualityImprove.8dStepEight') }}</span>
                          </t-col>
                          <t-col>
                            <span class="span_text">{{ improve8d.userD8Name }}</span>
                            <span style="margin-left: 10px" class="span_text">{{ improve8d.datetimeD8 }}</span>
                          </t-col>
                        </t-row>
                        <t-divider class="divider-line" />
                        <t-form
                          ref="formRef"
                          :rules="rules"
                          :data="formData"
                          :show-error-message="false"
                          label-align="right"
                          label-width="120px"
                          style="margin-top: 10px"
                        >
                          <t-row :gutter="[12, 12]">
                            <t-col :span="12">
                              <t-form-item
                                :label="t('qualityImprove.celebrationAndSharing')"
                                label-align="right"
                                name="d8Desc"
                              >
                                <t-textarea
                                  v-model="improve8d.d8Desc"
                                  :disabled="Number(improve8d.status) > 8 || formData.operateType === 'check'"
                                  :placeholder="t('common.placeholder.input')"
                                  autosize
                                />
                              </t-form-item>
                            </t-col>
                            <t-col :span="4">
                              <t-form-item :label="t('qualityImprove.attachment') + ''" name="attachment">
                                <t-link theme="primary" @click="formVisibleD8 = true">
                                  <div v-if="improve8d.status !== '8' || formData.operateType === 'check'">
                                    {{ t('qualityImprove.attachmentCheck') }}
                                  </div>
                                  <div v-else>
                                    {{ t('qualityImprove.attachmentUpload') }}
                                  </div>
                                </t-link>
                              </t-form-item>
                            </t-col>
                          </t-row>
                        </t-form>
                      </cmp-card>
                    </div>
                  </cmp-container>
                </template>
              </t-tab-panel>
              <t-tab-panel :value="1" :label="t('qualityImprove.processView')" :destroy-on-hide="false">
                <template #panel>
                  <cmp-container :full="true" :full-sub-index="[0]">
                    <cmp-table
                      v-model:pagination="pageUI"
                      row-key="id"
                      :hover="true"
                      :table-column="columns"
                      :table-data="tableData"
                      :total="dataTotal"
                      :resizable="true"
                      :fixed-height="true"
                    >
                      <template #title> {{ t('qualityImprove.subTitle') }}</template>
                      <template #handleMethodOp="{ row }">
                        <span v-if="row.handleMethod === 'SAVE'">
                          {{ t('common.button.save') }}
                        </span>
                        <span v-if="row.handleMethod === 'STAGING'">
                          {{ t('qualityImprove.staging') }}
                        </span>
                        <span v-if="row.handleMethod === 'REJECT_TO_BEFORE'">
                          {{
                            t('qualityImprove.rejectTwo') +
                            '-' +
                            t('qualityImprove.rejectToBefore') +
                            '，' +
                            row.problemDesc
                          }}
                        </span>
                        <span v-if="row.handleMethod === 'REJECT_TO_DRAFT'">
                          {{
                            t('qualityImprove.rejectTwo') +
                            '-' +
                            t('qualityImprove.rejectToDraft') +
                            '，' +
                            row.problemDesc
                          }}
                        </span></template
                      >
                    </cmp-table>
                  </cmp-container>
                </template>
              </t-tab-panel>
            </t-tabs>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-container>
    <template #footer>
      <t-button v-if="formData.operateType !== 'check'" @click="onSubmit">{{ t('common.button.save') }}</t-button>
      <t-button v-if="formData.operateType !== 'check'" theme="default" @click="onStaging">{{
        t('qualityImprove.staging')
      }}</t-button>
      <t-button
        v-if="formData.status != 'DRAFT' && formData.operateType != 'check'"
        theme="default"
        @click="formVisibleReject = true"
        >{{ t('qualityImprove.reject') }}</t-button
      >
    </template>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleReject"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.selectRejectNode')"
    :confirm-btn="null"
    width="auto"
  >
    <div style="display: flex; justify-content: center">
      <t-button v-if="formData.operateType !== 'check'" @click="onRejectToBefore">{{
        t('qualityImprove.rejectToBefore')
      }}</t-button>
      <t-button v-if="formData.operateType !== 'check'" theme="default" @click="onRejectToDraft">{{
        t('qualityImprove.rejectToDraft')
      }}</t-button>
    </div>
    <t-form ref="formRef" :rules="rules" label-width="60px" :show-error-message="true" style="margin-top: 20px">
      <t-form-item :label="t('qualityImprove.reason')" label-align="left" name="reason">
        <t-textarea v-model="reason" :placeholder="t('common.placeholder.input')" :autosize="{ minRows: 4 }" />
      </t-form-item>
    </t-form>
  </t-dialog>
  <!-- !上传组件 弹框 -->
  <t-dialog
    v-model:visible="formVisible"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="fileList"
        :readonly="formData.status !== 'DRAFT' || formData.operateType === 'check'"
        upload-path="pzgs"
        @upload-success="uploadSuccess"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleP"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improvePdca.fileListP"
        upload-path="pzgs"
        :readonly="improvePdca.status !== '1' || formData.operateType === 'check'"
        @upload-success="uploadSuccessP"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleD"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improvePdca.fileListD"
        upload-path="pzgs"
        :readonly="improvePdca.status !== '2' || formData.operateType === 'check'"
        @upload-success="uploadSuccessD"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleC"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improvePdca.fileListC"
        upload-path="pzgs"
        :readonly="improvePdca.status !== '3' || formData.operateType === 'check'"
        @upload-success="uploadSuccessC"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleA"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improvePdca.fileListA"
        upload-path="pzgs"
        :readonly="improvePdca.status !== '4' || formData.operateType === 'check'"
        @upload-success="uploadSuccessA"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleD1"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improve8d.fileListD1"
        upload-path="pzgs"
        :readonly="improve8d.status !== '1' || formData.operateType === 'check'"
        @upload-success="uploadSuccessD1"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleD2"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improve8d.fileListD2"
        upload-path="pzgs"
        :readonly="improve8d.status !== '2' || formData.operateType === 'check'"
        @upload-success="uploadSuccessD2"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleD3"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improve8d.fileListD3"
        upload-path="pzgs"
        :readonly="improve8d.status !== '3' || formData.operateType === 'check'"
        @upload-success="uploadSuccessD3"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleD4"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improve8d.fileListD4"
        upload-path="pzgs"
        :readonly="improve8d.status !== '4' || formData.operateType === 'check'"
        @upload-success="uploadSuccessD4"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleD5"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improve8d.fileListD5"
        upload-path="pzgs"
        :readonly="improve8d.status !== '5' || formData.operateType === 'check'"
        @upload-success="uploadSuccessD5"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleD6"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improve8d.fileListD6"
        upload-path="pzgs"
        :readonly="improve8d.status !== '6' || formData.operateType === 'check'"
        @upload-success="uploadSuccessD6"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleD7"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improve8d.fileListD7"
        upload-path="pzgs"
        :readonly="improve8d.status !== '7' || formData.operateType === 'check'"
        @upload-success="uploadSuccessD7"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <t-dialog
    v-model:visible="formVisibleD8"
    :close-on-overlay-click="false"
    :header="t('qualityImprove.attachmentUpload')"
    width="40%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="improve8d.fileListD8"
        upload-path="pzgs"
        :readonly="improve8d.status !== '8' || formData.operateType === 'check'"
        @upload-success="uploadSuccessD8"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
// import { debounce } from 'lodash';
import { isEmpty } from 'lodash';
// import { CloseIcon } from 'tdesign-icons-vue-next';
import { FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { PropType, Ref, ref, watch } from 'vue';

import { api } from '@/api/main';
import { api as apiQuality } from '@/api/quality';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import { usePage } from '@/hooks/modules/page';

import BcmpUploadContent from './bcmp-upload-content/index.vue';
import { useLang } from './lang';

const emit = defineEmits(['update:visible', 'permissionShow']);
const props = defineProps({
  visible: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
const { t } = useLang();
const tagValue = ref(0);
const { pageUI } = usePage(); // 分页工具
const formRef = ref(null);
const alertReject = ref(false);
const formVisibleReject = ref(false);
const alertRejectMessage = ref('');
const reason = ref('');
const formVisible = ref(false);
const formVisibleP = ref(false);
const formVisibleD = ref(false);
const formVisibleC = ref(false);
const formVisibleA = ref(false);
const formVisibleD1 = ref(false);
const formVisibleD2 = ref(false);
const formVisibleD3 = ref(false);
const formVisibleD4 = ref(false);
const formVisibleD5 = ref(false);
const formVisibleD6 = ref(false);
const formVisibleD7 = ref(false);
const formVisibleD8 = ref(false);
const improveToolOp = ref(false);
const dataTotal = ref(0);
const dtlRowKeys: Ref<any[]> = ref([]);
const perId = ref('');
const currentStage = ref(0);
const mainDialogVisible = ref(props.visible);
const onRejectToDraft = async () => {
  if (isEmpty(reason.value)) {
    MessagePlugin.warning(t('qualityImprove.inputReason'));
    return;
  }
  await apiQuality.improve.reject({
    reason: reason.value,
    rejectType: 'REJECT_TO_DRAFT',
    id: formData.value.id,
  });
  MessagePlugin.success(t('common.message.success'));
  formVisibleReject.value = false;
  onClose();
};
const onRejectToBefore = async () => {
  if (isEmpty(reason.value)) {
    MessagePlugin.warning(t('qualityImprove.inputReason'));
    return;
  }
  await apiQuality.improve.reject({
    reason: reason.value,
    rejectType: 'REJECT_TO_BEFORE',
    id: formData.value.id,
  });
  MessagePlugin.success(t('common.message.success'));
  formVisibleReject.value = false;
  onClose();
};

const formData = ref({
  operateType: 'add',
  billNo: '',
  moScheId: '',
  relateBillNo: '',
  id: '',
  inspectType: '',
  responsibility: '',
  improveTool: '',
  mitemId: '',
  handleMethod: '',
  supplierCode: '',
  supplierId: '',
  workcenterId: '',
  workcenterName: '',
  deptResponsibilityId: '',
  mitemCode: '',
  mitemDesc: '',
  workshopName: '',
  workshopId: '',
  scheCode: '',
  supplierName: '',
  personResponsibilityName: '',
  personResponsibilityId: '',
  userResponsibilityName: '',
  userResponsibilityId: '',
  occurNature: '',
  defectCategory: '',
  defectCategoryName: '',
  problemDescAdd: '',
  problemDesc: '',
  datetimeRequireFinish: '',
  isBatch: null,
  status: 'DRAFT',
});
const improve8d = ref({
  id: '',
  userD1Name: '',
  userD2Name: '',
  userD3Name: '',
  userD4Name: '',
  userD5Name: '',
  userD6Name: '',
  userD7Name: '',
  userD8Name: '',
  datetimeD1: '',
  datetimeD2: '',
  datetimeD3: '',
  datetimeD4: '',
  datetimeD5: '',
  datetimeD6: '',
  datetimeD7: '',
  datetimeD8: '',
  d1Desc: '',
  d2Desc: '',
  d3Desc: '',
  d4Desc: '',
  d5Desc: '',
  d6Desc: '',
  d7Desc: '',
  d8Desc: '',
  status: '',
  fileListD1: [],
  fileListD2: [],
  fileListD3: [],
  fileListD4: [],
  fileListD5: [],
  fileListD6: [],
  fileListD7: [],
  fileListD8: [],
});
const improvePdca = ref({
  id: '',
  status: '',
  userPlanName: '',
  userCheckName: '',
  userDoName: '',
  userActName: '',
  planDesc: '',
  doDesc: '',
  checkDesc: '',
  actDesc: '',
  datetimePlan: '',
  datetimeDo: '',
  datetimeCheck: '',
  datetimeAct: '',
  fileListP: [],
  fileListD: [],
  fileListC: [],
  fileListA: [],
});
const init = () => {
  improvePdca.value = {
    id: '',
    status: '',
    userPlanName: '',
    userCheckName: '',
    userDoName: '',
    userActName: '',
    planDesc: '',
    doDesc: '',
    checkDesc: '',
    actDesc: '',
    datetimePlan: '',
    datetimeDo: '',
    datetimeCheck: '',
    datetimeAct: '',
    fileListP: [],
    fileListD: [],
    fileListC: [],
    fileListA: [],
  };
  improve8d.value = {
    id: '',
    userD1Name: '',
    userD2Name: '',
    userD3Name: '',
    userD4Name: '',
    userD5Name: '',
    userD6Name: '',
    userD7Name: '',
    userD8Name: '',
    datetimeD1: '',
    datetimeD2: '',
    datetimeD3: '',
    datetimeD4: '',
    datetimeD5: '',
    datetimeD6: '',
    datetimeD7: '',
    datetimeD8: '',
    d1Desc: '',
    d2Desc: '',
    d3Desc: '',
    d4Desc: '',
    d5Desc: '',
    d6Desc: '',
    d7Desc: '',
    d8Desc: '',
    status: '',
    fileListD1: [],
    fileListD2: [],
    fileListD3: [],
    fileListD4: [],
    fileListD5: [],
    fileListD6: [],
    fileListD7: [],
    fileListD8: [],
  };
  formData.value = {
    operateType: 'add',
    billNo: '',
    moScheId: '',
    deptResponsibilityId: '',
    relateBillNo: '',
    id: '',
    inspectType: '',
    responsibility: '',
    improveTool: '',
    mitemId: '',
    handleMethod: '',
    supplierCode: '',
    supplierId: '',
    workcenterId: '',
    workcenterName: '',
    mitemCode: '',
    mitemDesc: '',
    workshopName: '',
    workshopId: '',
    scheCode: '',
    supplierName: '',
    personResponsibilityName: '',
    personResponsibilityId: '',
    userResponsibilityName: '',
    userResponsibilityId: '',
    occurNature: '',
    defectCategory: '',
    defectCategoryName: '',
    problemDescAdd: '',
    problemDesc: '',
    datetimeRequireFinish: '',
    isBatch: null,
    status: 'DRAFT',
  };
  alertReject.value = false;
  improveToolOp.value = false;
  fileList.value = [];
  tableData.value = [];
  dataTotal.value = 0;
  tagValue.value = 0;
  reason.value = '';
};
const isBatchOption = [
  {
    label: t('business.main.yes'),
    value: 1,
    id: 1,
  },
  {
    label: t('business.main.no'),
    value: 0,
    id: 2,
  },
];
const inspectTypeOption = ref([]);
const occurNatureOption = ref([]);
const billNoOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_TYPE' }).then((data) => {
  inspectTypeOption.value = data;
});
api.param.getListByGroupCode({ parmGroupCode: 'NATURE_OF_OCCURRENCE' }).then((data) => {
  occurNatureOption.value = data;
});
const querySelectChange = async (event) => {
  if (isEmpty(formData.value.inspectType)) {
    MessagePlugin.warning(t('qualityImprove.selectInspectionType'));
    return;
  }
  const res = (await apiQuality.improve.getRelateBillNo({
    keyword: event.length >= 1 ? event : '',
    inspectType: formData.value.inspectType,
  })) as any;
  billNoOption.value = res;
};

const onChangeType = async () => {
  if (isEmpty(formData.value.inspectType)) {
    return;
  }
  const res = (await apiQuality.improve.getRelateBillNo({
    keyword: formData.value.relateBillNo ? formData.value.relateBillNo : '',
    inspectType: formData.value.inspectType,
  })) as any;
  if (res) {
    billNoOption.value = res;
  }
  formData.value.defectCategory = '';
  formData.value.relateBillNo = '';
  formData.value.mitemCode = '';
  formData.value.mitemDesc = '';
  formData.value.supplierCode = '';
  formData.value.supplierName = '';
  formData.value.scheCode = '';
  formData.value.responsibility = '';
  formData.value.personResponsibilityName = '';
  formData.value.handleMethod = '';
  formData.value.workcenterName = '';
  formData.value.workshopName = '';
};
const onChangeBillNo = async () => {
  if (isEmpty(formData.value.relateBillNo)) {
    return;
  }
  const item = billNoOption.value.find((item) => item.billNo === formData.value.relateBillNo);
  formData.value.defectCategoryName = item.defectCategoryName;
  formData.value.mitemCode = item.mitemCode;
  formData.value.mitemDesc = item.mitemDesc;
  formData.value.supplierCode = item.supplierCode ? item.supplierCode : '';
  formData.value.supplierName = item.supplierName ? item.supplierName : '';
  formData.value.scheCode = item.scheCode ? item.scheCode : '';
  formData.value.responsibility = item.responsibility;
  formData.value.personResponsibilityName = item.personResponsibilityName;
  formData.value.personResponsibilityId = item.personResponsibilityId;
  formData.value.handleMethod = item.handleMethod;
  formData.value.workcenterName = item.workcenterName;
  formData.value.workcenterId = item.workcenterId;
  formData.value.workshopName = item.workshopName;
  formData.value.workshopId = item.workshopId;
  formData.value.mitemId = item.mitemId;
  formData.value.supplierId = item.supplierId;
  formData.value.moScheId = item.moScheId;
};
const columns: PrimaryTableCol<TableRowData>[] = [
  { title: `${t('qualityImprove.currentStage')}`, width: 100, colKey: 'currentStage' },
  { title: `${t('qualityImprove.content')}`, width: 160, colKey: 'problemDesc' },
  { title: `${t('qualityImprove.handleMethod')}`, width: 160, colKey: 'handleMethodOp' },
  { title: `${t('qualityImprove.opName')}`, width: 110, colKey: 'creatorName' },
  { title: `${t('qualityImprove.opTime')}`, width: 110, colKey: 'timeCreate' },
];

const initEdit = async () => {
  tagValue.value = 0;
  alertReject.value = false;
  const res = (await apiQuality.improve.getById({ id: formData.value.id })) as any;
  if (res) {
    Object.keys(res).forEach((key) => {
      if (key in formData.value && res[key]) {
        formData.value[key] = res[key];
      }
    });
    formData.value.isBatch = res.isBatch;
    const improve8dVo = res.improve8d;
    if (improve8dVo) {
      Object.keys(improve8dVo).forEach((key) => {
        if (key in improve8d.value && improve8dVo[key]) {
          improve8d.value[key] = improve8dVo[key];
        }
      });
    }
    const improvePdcaVo = res.improvePdca;
    if (improvePdcaVo) {
      Object.keys(improvePdcaVo).forEach((key) => {
        if (improvePdcaVo[key] && key in improvePdca.value) {
          improvePdca.value[key] = improvePdcaVo[key];
        }
      });
    }

    if (res.improveTool && res.improveTool !== '') {
      improveToolOp.value = true;
      if (formData.value.status !== 'DRAFT') {
        currentStage.value = res.improveTool === 'PDCA' ? Number(res.improvePdca.status) : Number(res.improve8d.status);
      }
    }
    fileList.value = res.fileList;
    const data = (await apiQuality.improve.getRelateBillNo({
      keyword: formData.value.relateBillNo ? formData.value.relateBillNo : '',
      inspectType: formData.value.inspectType,
    })) as any;
    if (data) {
      billNoOption.value = data;
    }
    await onChangeBillNo();
    // 获取流程信息
    const log = (await apiQuality.improve.getLog({
      id: formData.value.id,
      pageSize: pageUI.value.rows,
      pageNum: pageUI.value.page,
    })) as any;
    if (log) {
      tableData.value = log.list;
      dataTotal.value = log.total;
      const lastElement = log.list[log.list.length - 1];
      if (
        lastElement &&
        (lastElement.handleMethod === 'REJECT_TO_DRAFT' || lastElement.handleMethod === 'REJECT_TO_BEFORE')
      ) {
        alertReject.value = true;
        alertRejectMessage.value = `${lastElement.currentStage + t('qualityImprove.node') + t('qualityImprove.reject')}: ${lastElement.problemDesc}`;
      }
    }
  }
};

const onConfirmFile = () => {
  formVisible.value = false;
  formVisibleP.value = false;
  formVisibleD.value = false;
  formVisibleC.value = false;
  formVisibleA.value = false;
  formVisibleD1.value = false;
  formVisibleD2.value = false;
  formVisibleD3.value = false;
  formVisibleD4.value = false;
  formVisibleD5.value = false;
  formVisibleD6.value = false;
  formVisibleD7.value = false;
  formVisibleD8.value = false;
};

// 父方法
// const Emit = defineEmits(['permissionShow',]);
// 关闭窗口回到主页面
const onStaging = async () => {
  if (isEmpty(formData.value.inspectType)) {
    MessagePlugin.warning(t('qualityImprove.selectInspectionType'));
    return;
  }
  if (isEmpty(formData.value.relateBillNo)) {
    MessagePlugin.warning(t('qualityImprove.selectRelateBillNo'));
    return;
  }
  await apiQuality.improve.stagingBillNo({
    ...formData.value,
    fileList: fileList.value,
    improve8d: improve8d.value,
    improvePdca: improvePdca.value,
    isSave: false,
  });

  MessagePlugin.success(t('common.message.success'));
  onClose();
};
const onSubmit = async () => {
  if (isEmpty(formData.value.inspectType)) {
    MessagePlugin.warning(t('qualityImprove.selectInspectionType'));
    return;
  }
  if (isEmpty(formData.value.relateBillNo)) {
    MessagePlugin.warning(t('qualityImprove.selectRelateBillNo'));
    return;
  }
  if (formData.value.isBatch !== 0 && formData.value.isBatch !== 1) {
    MessagePlugin.warning(t('qualityImprove.selectIsBatch'));
    return;
  }
  if (isEmpty(formData.value.occurNature)) {
    MessagePlugin.warning(t('qualityImprove.selectOccurNature'));
    return;
  }
  if (isEmpty(formData.value.problemDesc)) {
    MessagePlugin.warning(t('qualityImprove.selectproblemDesc'));
    return;
  }
  if (isEmpty(formData.value.userResponsibilityId)) {
    MessagePlugin.warning(t('qualityImprove.selectisUserResponsibility'));
    return;
  }
  if (isEmpty(formData.value.deptResponsibilityId)) {
    MessagePlugin.warning(t('qualityImprove.selectdeptResponsibilityId'));
    return;
  }
  if (isEmpty(formData.value.datetimeRequireFinish)) {
    MessagePlugin.warning(t('qualityImprove.selectisUserdatetimeRequireFinish'));
    return;
  }
  if (isEmpty(formData.value.improveTool)) {
    MessagePlugin.warning(t('qualityImprove.selectImproveTool'));
    return;
  }
  if (isEmpty(formData.value.problemDescAdd)) {
    MessagePlugin.warning(t('qualityImprove.selectproblemDescAdd'));
    return;
  }
  formData.value.status = formData.value.status === 'DRAFT' ? 'INITIATED' : formData.value.status;
  await apiQuality.improve.stagingBillNo({
    ...formData.value,
    fileList: fileList.value,
    improve8d: improve8d.value,
    improvePdca: improvePdca.value,
    isSave: true,
  });

  MessagePlugin.success(t('common.message.success'));
  onClose();
};
const onClose = async () => {
  if (formData.value.operateType !== 'add') {
    await apiQuality.oqcInspectStd.delById([formData.value.id]);
  }
  emit('permissionShow', false); // 回到父
};

// // 上传文件
const fileList = ref([]);

const uploadSuccess = (file: AddFileType) => {
  fileList.value.push(file);
};
const uploadSuccessP = (file: AddFileType) => {
  improvePdca.value.fileListP.push(file);
};
const uploadSuccessD = (file: AddFileType) => {
  improvePdca.value.fileListD.push(file);
};
const uploadSuccessC = (file: AddFileType) => {
  improvePdca.value.fileListC.push(file);
};
const uploadSuccessA = (file: AddFileType) => {
  improvePdca.value.fileListA.push(file);
};
const uploadSuccessD1 = (file: AddFileType) => {
  improve8d.value.fileListD1.push(file);
};
const uploadSuccessD2 = (file: AddFileType) => {
  improve8d.value.fileListD1.push(file);
};
const uploadSuccessD3 = (file: AddFileType) => {
  improve8d.value.fileListD1.push(file);
};
const uploadSuccessD4 = (file: AddFileType) => {
  improve8d.value.fileListD1.push(file);
};
const uploadSuccessD5 = (file: AddFileType) => {
  improve8d.value.fileListD1.push(file);
};
const uploadSuccessD6 = (file: AddFileType) => {
  improve8d.value.fileListD1.push(file);
};
const uploadSuccessD7 = (file: AddFileType) => {
  improve8d.value.fileListD1.push(file);
};
const uploadSuccessD8 = (file: AddFileType) => {
  improve8d.value.fileListD1.push(file);
};
const uploadfail = (file: AddFileType) => {
  MessagePlugin.info(`上传文件失败`);
  console.log('uploadSuccess', file);
};

const deleteSuccess = (file: AddFileType) => {
  MessagePlugin.info(`删除文件成功`);
  console.log('deleteSuccess', file);
};

const batchDeleteSuccess = (files: AddFileType[]) => {
  MessagePlugin.info(`删除多个文件成功`);
  console.log('batchDeleteSuccess', files);
};

const tableData = ref([]);

// #表单定义规则
const rules: FormRules = {
  inspectType: [{ required: true, message: '不能为空', trigger: 'change' }],
  deptResponsibilityId: [{ required: true, message: '不能为空', trigger: 'change' }],
  reason: [{ required: true, message: '不能为空', trigger: 'change' }],
  relateBillNo: [{ required: true, message: '不能为空', trigger: 'change' }],
  problemDesc: [{ required: true, message: '不能为空', trigger: 'change' }],
  occurNature: [{ required: true, message: '不能为空', trigger: 'change' }],
  isBatch: [{ required: true, message: '不能为空', trigger: 'change' }],
  userResponsibilityName: [{ required: true, message: '不能为空', trigger: 'change' }],
  improveTool: [{ required: true, message: '不能为空', trigger: 'change' }],
  problemDescAdd: [{ required: true, message: '不能为空', trigger: 'change' }],
  datetimeRequireFinish: [{ required: true, message: '不能为空', trigger: 'change' }],
};

watch(mainDialogVisible, (value: boolean) => {
  emit('update:visible', value);
});
watch(
  () => props.visible,
  (val) => {
    mainDialogVisible.value = val;
  },
  { deep: true },
);

defineExpose({
  form: formRef,
  dtlRowKeys,
  formData,
  initEdit,
  init,
  perId,
  fileList,
});
</script>

<style lang="less" scoped>
.cards_title {
  :deep(.t-card__title) {
    font-weight: bold;
    color: var(--td-gray-color-8);
    font-size: 16px;
  }
}

.tag-item {
  margin-right: 8px; /* 控制标签之间的间距 */
  align-items: center; /* 垂直居中 */
}

.span_title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
}

.span_text {
  color: rgb(69 69 69 / 100%);
  font-size: 14px;
}

.divider-line {
  border-bottom: 1px solid rgb(213 216 219 / 10%);
  margin: 12px 0;
}

.main-steps {
  :deep(.t-steps-item__inner) {
    display: flex;
    text-align: center;
    align-items: center;
    flex-direction: column;
    gap: 4px;
  }

  :deep(.t-steps-item__title) {
    font-size: 12px;
  }

  :deep(.t-steps-item__title::after) {
    top: 0 !important;
  }
}

.card-borded {
  border: 1px solid rgb(213 216 219 / 100%);
  border-radius: 4px;
}

.tab-add-padding-bottom {
  padding-bottom: 20px !important;
}
</style>

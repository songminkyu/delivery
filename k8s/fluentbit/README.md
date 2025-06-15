### 설정 방법

1. **직접 비밀번호 입력 (비추천)**:
   ```yaml
   HTTP_Passwd your_actual_password_here
   ```

2. **환경 변수 사용 (권장)**:
   ```yaml
   HTTP_Passwd ${ELASTICSEARCH_PASSWORD}
   ```

   그리고 `env` 섹션에 환경 변수 추가:
   ```yaml
   env:
     - name: ELASTICSEARCH_PASSWORD
       valueFrom:
         secretKeyRef:
           name: elasticsearch-secret
           key: password
   ```

3. **Kubernetes Secret 생성**:
   ```bash
   kubectl create secret generic elasticsearch-secret \
     --from-literal=password=your_actual_password
   ```

### 보안 권장사항

- 비밀번호를 values.yaml 파일에 직접 하드코딩하지 마세요
- Kubernetes Secret을 사용하여 민감한 정보를 관리하세요
- Git 저장소에 실제 비밀번호가 포함되지 않도록 주의하세요

### 배포 전 체크리스트

- [ ] Elasticsearch 클러스터가 실행 중인지 확인
- [ ] `HTTP_USER`가 올바른 사용자명인지 확인 (기본값: `elastic`)
- [ ] `HTTP_Passwd`가 실제 비밀번호 또는 환경 변수로 설정되었는지 확인
- [ ] Elasticsearch 호스트명이 올바른지 확인 (현재: `elasticsearch-master`)
- [ ] TLS 설정이 Elasticsearch 클러스터 설정과 일치하는지 확인

### 문제 해결

배포 후 로그가 Elasticsearch에 전송되지 않는 경우:

1. Fluent Bit 파드 로그 확인:
   ```bash
   kubectl logs -f daemonset/fluent-bit
   ```

2. Elasticsearch 연결 테스트:
   ```bash
   kubectl exec -it <fluent-bit-pod> -- curl -u elastic:password https://elasticsearch-master:9200
   ```

3. 인증 오류 시 비밀번호 재확인 필요

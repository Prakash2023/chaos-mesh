// Copyright Chaos Mesh Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

package schedule

import (
	"github.com/go-logr/logr"
	"k8s.io/apimachinery/pkg/runtime"

	config "github.com/chaos-mesh/chaos-mesh/pkg/config"
	"github.com/chaos-mesh/chaos-mesh/pkg/dashboard/core"
)

func Bootstrap(schedule core.ScheduleStore,
	event core.EventStore,
	config *config.ChaosDashboardConfig,
	scheme *runtime.Scheme,
	log logr.Logger) *Service {
	return NewService(schedule, event, config, scheme, log.WithName("schedules"))
}
